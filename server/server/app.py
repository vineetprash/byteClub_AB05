from bs4 import BeautifulSoup as BS
import requests as req
from scipy.special import softmax
from transformers import pipeline, AutoTokenizer, AutoConfig, AutoModelForSequenceClassification
from prophet import Prophet
import yfinance as yf
from prophet.plot import plot_plotly
import json
import requests
import gradio as gr


headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTA0YmU1ZTYtMjhkMC00MjdiLTk0ZWItNzU3MGFkMmExMjlhIiwidHlwZSI6ImFwaV90b2tlbiJ9.2BKagZKfM80k6dkV03haSqw11885xpilA1NR29My0wI"}

url = "https://api.edenai.run/v2/text/generation"

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
# PT
model = AutoModelForSequenceClassification.from_pretrained(MODEL)




def fetch_stock_data(ticker_symbol, start_date, end_date):
    stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)
    df = stock_data[['Adj Close']].reset_index()
    df = df.rename(columns={'Date': 'ds', 'Adj Close': 'y'})
    return df


def train_prophet_model(df):
    model = Prophet()
    model.fit(df)
    return model



def make_forecast(model, periods):
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    return forecast

def fetch_stock_name(prompt):
    # Example text input
    text = ("I will provide a sentence enclosed in square brackets '[ ]'."
            " The sentence will pertain to a stock in the stock market."
            " Your task is to identify the mentioned stock and return its ticker symbol."
            " Present the name of the stock along with its ticker symbol in the format 'stock_name: ticker_symbol'."
            " For example, if the stock mentioned is 'Apple', then the output should be 'Apple: AAPL'."
            "The sentence is: "
            )


    input_text = text + prompt + " "

    payload = {
        "providers": "openai,cohere",
        "text": input_text,
        "temperature": 0.2,
        "max_tokens": 250,
        "fallback_providers": ""

    }
    response = requests.post(url, json=payload, headers=headers)

    result = json.loads(response.text)
    result =result['openai']['generated_text']
    name =result.split(":")[0]
    ticker = result.split(":")[1]
    name = name.strip()
    ticker = ticker.strip()
    return name, ticker



def fetch_news_sentiment(name):
    url = f"https://www.businesstoday.in/topic/{name.lower()}"
    print(url)

    webpage = req.get(url)  # YOU CAN EVEN DIRECTLY PASTE THE URL IN THIS
    # HERE HTML PARSER IS ACTUALLY THE WHOLE HTML PAGE
    trav = BS(webpage.content, "html.parser")

    # TO GET THE TYPE OF CLASS
    # HERE 'a' STANDS FOR ANCHOR TAG IN WHICH NEWS IS STORED
    list =[]
    for link in trav.find_all('h2'):
            list.append(link.string)

    list.remove(None)
    list.remove("COMPANIES")
    list.remove("INDICES ANALYSIS")
    list.remove("MUTUAL FUNDS")
    list.remove("NEWS")
    list.remove("AMCs")

    for i in list:
        print(i)

    list.remove(None)
    neg =0
    pos=0
    neu =0
    for i in list:
        encoded_input = tokenizer(i, return_tensors='pt')
        output = model(**encoded_input)
        scores = output[0][0].detach().numpy()
        scores = softmax(scores)
        neg = neg + scores[0]
        neu = neu + scores[1]
        pos = pos + scores[2]

    return neg,neu,pos,list


def make_graph(ticker):
    ticker_symbol = ticker
    start_date = "2020-01-01"
    end_date = "2024-03-01"
    df = fetch_stock_data(ticker_symbol, start_date, end_date)
    model = train_prophet_model(df)
    forecast = make_forecast(model, 365)
    return forecast


def main(prompt):
    name, ticker = fetch_stock_name(prompt)
    neg,neu,pos,news =fetch_news_sentiment(name)
    sum = neg+neu+pos
    neg = neg/sum
    neu = neu/sum
    pos = pos/sum
    print(neg, neu, pos)
    if neu >0.55:
        payload = {
            "providers": "openai,cohere",
            "text": f"Generate a sentence in natural language which tells me that the stock {name} is stable currently. "
                    f"It wont have a lot of positive or negative fluctuations and you should hold it if you have it but "
                    f"no need to buy on priority",
            "temperature": 0.9,
            "max_tokens": 250,
            "fallback_providers": ""

        }
    elif pos > neg:
        payload = {
            "providers": "openai,cohere",
            "text": f"Generate a sentence in natural language which tells me that the stock {name} has momentum. "
                    f"Recent trends suggest that the stock is going up and "
                    f"it is a good time to buy the stock and hold it for a while",

            "temperature": 0.9,
            "max_tokens": 250,
            "fallback_providers": ""

        }
    else:
        payload = {
            "providers": "openai,cohere",
            "text": f"Generate a sentence in natural language which tells me that the stock {name} is not doing well. "
                    f"Recent trends suggest that the stock is going down and "
                    f"it is a good time to sell the stock and not buy it",
            "temperature": 0.9,
            "max_tokens": 250,
            "fallback_providers": ""

        }
    response = requests.post(url, json=payload, headers=headers)
    result = json.loads(response.text)
    result = result['openai']['generated_text']
    result.strip()
    graph = make_graph(ticker)
    return result,graph,news


demo = gr.Interface(fn=main, inputs=["text"], outputs=["text", gr.DataFrame(), "text"])

demo.launch()


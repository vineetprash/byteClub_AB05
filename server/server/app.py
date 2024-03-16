from transformers import pipeline
from bs4 import BeautifulSoup as BS
import requests as req
from transformers import pipeline
from prophet import Prophet
import yfinance as yf
from prophet.plot import plot_plotly



def fetch_stock_data(ticker_symbol, start_date, end_date):
    stock_data = yf.download(ticker_symbol, start=start_date, end=end_date)
    df = stock_data[['Adj Close']].reset_index()
    df = df.rename(columns={'Date': 'ds', 'Adj Close': 'y'})
    return df

# Function to train the Prophet model
def train_prophet_model(df):
    model = Prophet()
    model.fit(df)
    return model

# Function to make the forecast
def make_forecast(model, periods):
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    return forecast

sentiment_task = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest", tokenizer="cardiffnlp/twitter-roberta-base-sentiment-latest")



# Load the text-to-text generation pipeline
text_to_text_pipeline = pipeline("text2text-generation", model="google/flan-t5-small", tokenizer="google/flan-t5-small")


# Example text input
text = ("I will give you a sentence in natural language "
        "and you will identify which stock i am talking about and return its ticker symbol "
        ". The sentence is:' ")

prompt = input("Enter the sentence: ")

input_text = text + prompt + "'"

# Generate text based on the input
result = text_to_text_pipeline(input_text, max_length=100, do_sample = True ,temperature=0.5, top_k=50, top_p=0.95, num_return_sequences=1)

url = f"https://www.businesstoday.in/topic/{result[0]['generated_text']}"
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

for i in list:
    print(sentiment_task(i))

ticker_symbol = "GOOGL"
start_date = "2020-01-01"
end_date = "2024-03-01"
df = fetch_stock_data(ticker_symbol, start_date, end_date)
model = train_prophet_model(df)
forecast = make_forecast(model, 365)
fig1 = plot_plotly(model, forecast)
fig1.update_traces(marker=dict(color='red'), line=dict(color='white'))
fig1.update_layout(title_text='Stock Price Prediction', xaxis_title='Date', yaxis_title='Price')
fig1.show()

# from transformers import pipeline
from bs4 import BeautifulSoup as BS
import requests as req
# from transformers import pipeline
from prophet import Prophet
import yfinance as yf
from prophet.plot import plot_plotly
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
app = FastAPI()
# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_authdetails=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
from datetime import datetime
from cryptography.fernet import Fernet
# Generate a key
# key = Fernet.generate_key()
key=b'B8rPRkgG8ZuBIEIX5z-Auu9qB59jvFdVkJOIXbdlZ6I='
cipher = Fernet(key)


'''********************************************************************
                    database connection and set up
'''
import psycopg2
try:
    connection = psycopg2.connect(
        user="postgres",
        password="HHDbAgqDkNkwiTgrmsBWEgxKBliGffbF",
        host="roundhouse.proxy.rlwy.net",
        port="37139",
        database="railway"
    )
    print("database connected successfully")
    cur = connection.cursor()
except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL:", error)
cur.execute(
    '''
    create table if not exists authdetails(
        phone varchar(10),
        username varchar(20),
        password varchar(10),
        createdOn timestamp
    )
    '''
)
cur.execute(
    '''create table if not exists stocks
        (
         ticket varchar(20),
         username varchar(20) foriegn key references authdetails(username),
         amount integer,
         dateOfInvestment timestamp
        )'''
)
cur.execute('''
    create table if not exists apptransactions(
        atTime timestamp,
        username varchar(10),
        description varchar(30)
    )
''')
connection.commit()
'''*********************************************************************'''

'''request models are given below'''
from pydantic import BaseModel
class signinsignup(BaseModel):
    username:str
    password:str

class stock(BaseModel):
    ticket:str
    username:str
    amount:int



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

# sentiment_task = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest", tokenizer="cardiffnlp/twitter-roberta-base-sentiment-latest")



# Load the text-to-text generation pipeline
# text_to_text_pipeline = pipeline("text2text-generation", model="google/flan-t5-small", tokenizer="google/flan-t5-small")



# Example text input
text = ("I will give you a sentence in natural language "
        "and you will identify which stock i am talking about and return its ticker symbol "
        ". The sentence is:' ")

prompt = input("Enter the sentence: ")

input_text = text + prompt + "'"

# Generate text based on the input
# result = text_to_text_pipeline(input_text, max_length=100, do_sample = True ,temperature=0.5, top_k=50, top_p=0.95, num_return_sequences=1)
result=[{'generated_text':'GOOGL'}]
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

# for i in list:
#     print(sentiment_task(i))

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


'''write the chat logic here'''
@app.get("/chat/")
async def chat(token,req):
    pass







'''*********************************************************
    below given are authentication and token generation 
        validation , signin signup routes
*********************************************************'''

def generate_token():
    '''This function generates a token from currenttimestamp
        which is sent to client frontend, and everytime client
        has to give this token to access any routes'''
    generationtimestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S").encode()
    return cipher.encrypt(generationtimestamp)

def validate_token(tokenvalue):
    ''' This function checks the validity of the token ,
        one client can use one token on
        one device only for 1 hour, else token will be expired 
        and session will be inactive'''
    try:
        generationtimestamp=cipher.decrypt(tokenvalue)
        generationtimestamp=datetime.strptime(
                                                generationtimestamp.decode(),
                                                "%Y-%m-%d %H:%M:%S"
                                             )
        currenttimestamp=datetime.now()
        diff=currenttimestamp-generationtimestamp
        if(diff.seconds>3600):
            return False
    except:
            return False
    return True

@app.post("/signup/")
async def signup(requ:signinsignup):
    cur.execute(f"select * from authdetails where username='{requ.username}'")
    rows=cur.fetchall()
    if(len(rows)==1):
        return {
            "message":"user already exists try to signin"
        }
    else:
        cur.execute("insert into authdetails values (%s,%s,%s,%s)",(requ.phone,requ.username,requ.password,datetime.now()))
        cur.execute("insert into apptransactions values(%s,%s,%s)",(datetime.now(),requ.phone,'signup'))
        connection.commit()
        return {
            "message":"user created"
        }
    
@app.post("/signin/")
async def signin(requ:signinsignup):
    '''function will check wheter username exists in database'''
    cur.execute("select * from authdetails where username=%s",(requ.username,))
    rows=cur.fetchall()
    if(rows==[]):
        return { "message" : "user does not exists pls sign up"}
    else:
        cur.execute("insert into apptransactions values(%s,%s,%s)",(datetime.now(),requ.phone,'signin'))
        connection.commit()
        '''if exists then we return him token'''
        return{"token":generate_token()}



@app.post("/showstocklist/")
async def showstock(username:str):
    cur.execute("select ticket from stocks where username=%s",username)
    rows=cur.fetchall()
    '''write the function for printing current stock value'''



@app.post("/stockcard/")
async def showcard(ticket:str):
    df=fetch_stock_data(ticket,"2024-01")
    '''Tushar write the function for forecasted value of stock here'''



'''
***************************************************
    USER routes when he has logged in and 
        has valid token are given below
***************************************************
'''

'''Buying a new stock'''

'''
// this is below example of what content and request
// is put in the frontend

const stockDetails = {
    "ticket":"GOOGL",
    "username":"xyz",
    "amount":5000
};

// Define the token
const token = "Uuxt6MjEFEL2VYqK0T8YybZiIWU=*hl+75Qq/xtAaUktrCXtA3Q==*6DJ4ExTU/c0J6EeH/xyEMA==*LvXtk0D8jealdGc3NU2oGg==";

// Construct the request URL with the token as a URL parameter
const url = `/buyStock/?token=${encodeURIComponent(token)}`;

// Make a POST request with Fetch API
fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(stockDetails)
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
'''


@app.post("/buyStock/")
async def buyStock(token,req:stock):
    if((validate_token(token))==False):
        raise HTTPException(status_code=403,detail="forbidden action pls login")
    cur.execute("insert into stocks values(%s,%s,%s,%s)",
                (req.ticket,req.amount,req.username,datetime.now())
    )
    cur.execute("insert into apptransactions values(%s,%s,%s)",(datetime.now(),req.username,f'buys new stock of {req.ticket} for {req.amount}'))
    connection.commit()
    return{"message":"bought successfully"}

@app.post("/sellstock/")
async def sellStock(token,req:stock):
    if((validate_token(token))==False):
        raise HTTPException(status_code=403,detail="forbidden action pls login")
    cur.execute(
        f"delete from stocks where username={req.username} and {req.ticket}"
    )
    cur.execute("insert into apptransactions values(%s,%s,%s)",(datetime.now(),req.username,f'sells stock of {req.ticket} for {req.amount}'))
    connection.commit()
    return{"message":"sold successfully"}
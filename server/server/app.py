from transformers import pipeline
from bs4 import BeautifulSoup as BS
import requests as req
from transformers import pipeline
sentiment_task = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest", tokenizer="cardiffnlp/twitter-roberta-base-sentiment-latest")
print(sentiment_task("Covid cases are increasing fast!"))


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

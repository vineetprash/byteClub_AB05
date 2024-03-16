from transformers import pipeline

# Load the text-to-text generation pipeline
text_to_text_pipeline = pipeline("text2text-generation", model="google/flan-t5-small", tokenizer="google/flan-t5-small")


# Example text input
input_text = "I will give you a sentence in natural language and you will identify which stock i am talking about and return its ticker symbol. The sentence is: 'I want a safe investment and my friend reccomended ths company callled tcs should i invest'."



# Generate text based on the input
generated_text = text_to_text_pipeline(input_text, max_length=100, do_sample = True ,temperature=0.5, top_k=50, top_p=0.95, num_return_sequences=1)

# Print the generated text
print(generated_text[0]['generated_text'])

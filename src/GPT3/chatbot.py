import openai
import os 
from dotenv import load_dotenv

load_dotenv()
GPT3_API_KEY = os.getenv("GPT3_API_KEY")

openai.api_key = GPT3_API_KEY

prompt = "Write a joke for today."

response = openai.Completion.create(
    engine="text-davinci-001",
    prompt=prompt,
    temperature = 0.4,
    max_tokens=64
)
# openai.ChatCompletion.create(
#   model="gpt-3.5-turbo",
#   messages=[
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": "Who won the world series in 2020?"},
#         {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
#         {"role": "user", "content": "Where was it played?"}
#     ]
# )
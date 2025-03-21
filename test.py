from openai import OpenAI
client = OpenAI(api_key="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")

completion = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {"role": "developer", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)

print(completion.choices[0].message)
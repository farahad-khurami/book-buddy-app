import openai

def openai_request(prompt: str, system_prompt: str, model="gpt-3.5-turbo"):
    """Send a request to OpenAI and return the response."""
    client = openai.OpenAI()

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
    )

    return response.choices[0].message.content

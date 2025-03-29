import openai
import tiktoken


def openai_request(prompt: str, system_prompt: str, model: str):
    """Send a request to OpenAI and return the response."""
    client = openai.OpenAI()

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
        max_tokens=500
    )

    return response.choices[0].message.content


def count_tokens(text: str, model: str = "gpt-4o") -> int:
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

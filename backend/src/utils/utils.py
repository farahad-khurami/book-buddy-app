import openai
import json
import re


class InvalidResponseError(Exception):
    pass


def openai_request(prompt: str, system_prompt: str, model="gpt-3.5-turbo"):
    """Send a request to OpenAI and return the response."""
    client = openai.OpenAI()

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
    )

    return response.choices[0].message.content


def clean_json_response(response: str):
    """Clean repsonses and parse JSON response from OpenAI."""
    try:

        cleaned_response = re.sub(r"^[^{\[]+|[^}\]]+$", "", response.strip())
        return json.loads(cleaned_response)

    except json.JSONDecodeError:
        raise InvalidResponseError("Invalid JSON response")

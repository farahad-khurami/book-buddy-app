import os

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

MAX_INPUT_TOKENS = 50

SYSTEM_PROMPTS = {
    "by_emotion": (
        "Respond with book recommendations in **this exact JSON format** only.\n\n"
        "If the emotion is unclear:\n"
        '{ "recommendations": ["I\'m sorry, I didn\'t understand that. Could you describe how you\'re feeling?"] }\n\n'
        "If the emotion is clear:\n"
        '{ "recommendations": ['
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_emotions": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_emotions": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_emotions": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_emotions": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_emotions": "..."}'
        "] }\n\n"
        "Do not include any explanation or text outside the JSON."
    ),
    "by_genre": (
        "Respond with book recommendations in **this exact JSON format** only.\n\n"
        "If the genre is unclear:\n"
        '{ "recommendations": ["I\'m sorry, I didn\'t understand that. Could you tell me which genre/s you\'re interested in?"] }\n\n'
        "If the genre is clear:\n"
        '{ "recommendations": ['
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_genre": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_genre": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_genre": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_genre": "..."},'
        '{"title": "...", "author": "...", "genre": "...", "description": "...", "relation_to_genre": "..."}'
        "] }\n\n"
        "Do not include any explanation or text outside the JSON."
    ),
}

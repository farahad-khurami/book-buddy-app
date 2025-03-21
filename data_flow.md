1. **User Enters a Feeling** → (*Frontend: React/TypeScript → Backend: FastAPI/Python*)
   - Example: "I feel nostalgic and want something comforting."
   - The frontend (`React/TypeScript`) sends the user's input to the API (`api/src/main.py`).

2. **Identifying Relevant Themes** → (*OpenAI GPT API via AI Processing*)
   - The API (`api/src/recommend.py`) forwards the user input to AI processing (`backend/ai_processing/theme_extraction.py`).
   - The AI extracts relevant themes from the input.
   - Example output: ["childhood memories", "warm storytelling"].

3. **Searching the Book Database** → (*PostgreSQL + `pgvector` or FAISS for vector search*)
   - The extracted themes are passed to the database service (`api/src/database.py`).
   - Book descriptions stored in PostgreSQL are converted into **embeddings** (precomputed using `backend/ai_processing/embeddings.py`).
   - A **semantic similarity search** is performed to find books that closely match the themes.

4. **Refining the Selection** → (*OpenAI GPT API via AI Processing*)
   - The initial list of books is reviewed and ranked based on **emotional tone, narrative style, and suitability for the user's mood**.
   - This refinement occurs in `backend/ai_processing/ranking.py`.

5. **Presenting the Recommendations** → (*Frontend: React/TypeScript, Backend fetches book metadata from Open Library API or Google Books API*)
   - The final selection of books is sent back through the API (`api/src/recommend.py`).
   - Additional details (title, author, description, cover image) are retrieved via `backend/book_fetch/google_books.py` or `backend/book_fetch/open_library.py`.
   - The frontend displays the recommendations in a clear and engaging format.


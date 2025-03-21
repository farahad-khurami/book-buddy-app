1. **User Enters a Feeling** → (*Frontend: React/TypeScript → Backend: FastAPI/Python*)
   - Example: "I feel nostalgic and want something comforting."
   - The frontend sends the user's input to the backend API.

2. **Identifying Relevant Themes** → (*OpenAI GPT API*)
   - The backend processes the input to determine relevant themes.
   - Example output: ["childhood memories", "warm storytelling"].

3. **Searching the Book Database** → (*PostgreSQL + `pgvector` or FAISS for vector search*)
   - The extracted themes are used to search the database.
   - Book descriptions are converted into **embeddings** (precomputed using `sentence-transformers` or OpenAI's `text-embedding-ada-002`).
   - A **semantic similarity search** is performed to find books that closely match the themes.

4. **Refining the Selection** → (*OpenAI GPT API*)
   - The initial list of books is reviewed and ranked based on **emotional tone, narrative style, and suitability for the user's mood**.

5. **Presenting the Recommendations** → (*Frontend: React/TypeScript, Backend fetches book metadata from Open Library API or Google Books API*).
   - The final selection of books is sent to the frontend.
   - Additional details (title, author, description, cover image) are retrieved from Open Library or Google Books API.
   - The frontend displays the recommendations in a clear and engaging format.


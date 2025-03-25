from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import recommend
import uvicorn
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger("request-timer")
app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommend.router, prefix="/recommend")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)

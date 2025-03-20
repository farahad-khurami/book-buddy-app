# Book-Buddy

Book-Buddy is a book recommendation platform that provides users with personalised book suggestions. It aggregates book metadata from external sources and uses a recommendation engine to deliver relevant book recommendations based on user preferences.

## Features
- **Mass Book Collection:** Fetches book metadata from Google Books API and ISBNdb in bulk.
- **Personalised Recommendations:** Uses machine learning to recommend books based on user reading history and preferences.
- **REST APIs:** Exposes endpoints for fetching book data and retrieving recommendations.
- **User Authentication:** Allows users to create profiles and save book preferences.
- **Modern Frontend:** Built with React and TypeScript for a seamless user experience.

---

## Architecture Overview

Book-Buddy follows a **microservices-based architecture**, with distinct services for book collection, recommendation, user management, and the frontend.

### **1. BookFetch Service (Python)**
- Collects large-scale book metadata from Google Books API and ISBNdb.
- Runs scheduled batch jobs to keep book data up to date.
- Stores frequently accessed book data in a local database.

### **2. Recommendation Engine (Python)**
- Uses collaborative filtering and content-based recommendation models.
- Stores user interaction data for improved recommendations over time.
- Exposes an API for fetching recommended books.

### **3. Suggestion API (Node.js/TypeScript)**
- Interfaces between the frontend and the recommendation engine.
- Exposes RESTful endpoints to retrieve book recommendations.

### **4. User Management Service (Node.js/TypeScript)**
- Handles authentication and user profile management.
- Stores user preferences and reading history.

### **5. Frontend (React/TypeScript)**
- Allows users to browse books, get recommendations, and manage their profiles.
- Communicates with backend services via APIs.

---

## Folder Structure
```
book_buddy/
├── backend/
│   ├── book_fetch/             # Python service for fetching book data
│   ├── recommendation_engine/  # Python recommendation system
│   ├── suggestion_api/         # Node.js API for book suggestions
│   ├── user_management/        # Node.js authentication service
│
├── frontend/                   # React TypeScript frontend
│
├── database/                    # Database schema and migrations
├── docker-compose.yml           # Container orchestration
├── .env                         # Environment variables
├── README.md                    # Project documentation
```

---

## Installation & Setup

### **Prerequisites**
- Docker & Docker Compose
- Node.js & npm
- Python 3.x
- PostgreSQL or MongoDB

### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/book-buddy.git
cd book-buddy
```

### **2. Set Up Environment Variables**
Create a `.env` file in the root directory and configure necessary API keys and database connections.

### **3. Start the Services with Docker**
```sh
docker-compose up --build
```

This will start all services, including the frontend, backend services, and database.

### **4. Running Services Manually**
#### **Backend Services**
```sh
# Start the BookFetch service
cd backend/book_fetch && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && uvicorn src.main:app --reload

# Start the Recommendation Engine
cd ../recommendation_engine && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && uvicorn src.main:app --reload

# Start the Suggestion API
cd ../suggestion_api && npm install && npm run dev

# Start the User Management Service
cd ../user_management && npm install && npm run dev
```

#### **Frontend**
```sh
cd frontend && npm install && npm run dev
```

---

## API Endpoints

### **BookFetch Service** (Python)
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/books?query=<title|author|isbn>` | Fetch books from external APIs |
| GET | `/books/<isbn>` | Get details of a specific book |

### **Recommendation Engine** (Python)
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/recommendations?user_id=<id>` | Get personalised book recommendations |

### **Suggestion API** (Node.js/TypeScript)
| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/suggest?user_id=<id>` | Fetch book recommendations from the recommendation engine |

### **User Management Service** (Node.js/TypeScript)
| Method | Endpoint | Description |
|--------|----------|--------------|
| POST | `/register` | Create a new user account |
| POST | `/login` | Authenticate user |
| GET | `/user/profile` | Fetch user profile and preferences |

---

## Contributing
We welcome contributions! If you’d like to contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact
For questions or support, please reach out to `your-email@example.com` or open an issue in the repository.

---


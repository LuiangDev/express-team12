
# Email Generation API Server

This is a FastAPI-based server application that provides intelligent email generation services with semantic context awareness. The server is built using modern Python technologies and follows best practices for API development.

## 🚀 Features

- Email generation with context awareness
- Profile management
- Semantic search capabilities
- Multiple email types support (Welcome, Promotional, Support)
- Database integration with SQLModel
- Authentication with Clerk
- CORS support for frontend integration
- Vector database support with pgvector for RAG operations

## 🛠 Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLModel**: SQL database interaction
- **LangChain**: For AI/LLM integration
- **Groq**: AI model integration
- **Uvicorn**: ASGI server
- **PostgreSQL + pgvector**: Database with vector support
- **Pydantic**: Data validation
- **Python-dotenv**: Environment configuration
- **Docker**: Containerization

## 📁 Project Structure

```
server/
├── api/
│   ├── models/
│   │   ├── email_models.py
│   │   ├── email_validation_models.py
│   │   ├── embedding_models.py
│   │   └── profile_models.py
│   ├── routes/
│   │   ├── email_router.py
│   │   └── profile_route.py
│   ├── services/
│   │   ├── email_service.py
│   │   ├── embedding_service.py
│   │   └── profile_embedding_service.py
│   ├── clerk_config.py
│   ├── db_config.py
│   └── main.py
├── pytest/
│   ├── conftest.py
│   └── test_app.py
├── scripts/
│   ├── pytest.sh
│   └── run-dev.sh
├── Dockerfile
├── requirements.txt
└── requirements.dev.txt
```

## � Getting Started

1. **Environment Setup**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Database Setup**
   Start PostgreSQL with pgvector using Docker:
   ```bash
   docker run --name pg-rag -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=ragdb -p 5432:5432 -d ankane/pgvector
   ```
   Connection string: `postgresql://postgres:postgres@localhost:5432/ragdb`

3. **Environment Variables**
   Create a `.env` file with:
   ```
   FRONTEND_URL=<your-frontend-url>
   ENVIRONMENT=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ragdb
   CLERK_SECRET_KEY=<your-clerk-secret>
   ```

4. **Running the Server**
   ```bash
   cd server
   ./scripts/run-dev.sh
   ```
   Or manually:
   ```bash
   python api/main.py
   ```

## 🔄 API Endpoints

### Email Generation
- `POST /emails/generate/welcome/{profile_id}`: Generate welcome emails
- `POST /emails/generate/promotion/{profile_id}`: Generate promotional emails
- `POST /emails/generate/support/{profile_id}`: Generate support reply emails

### Profile Management
- Profile creation and management endpoints (see profile_route.py for details)

## 🧪 Testing

Run tests using:
```bash
./scripts/pytest.sh
```

## 🐳 Docker Support

The application includes a Dockerfile for containerization. Build and run with:
```bash
# Build the image
docker build -t express-project-12 .

# Run the container
docker run --name project-container -p 3000:3000 --env-file ./.env express-project-12

# Check logs if needed
docker logs project-container
```

## 📝 Development Notes

- The server runs on port 3000 by default
- CORS is configured to accept requests from the frontend URL specified in environment variables
- Development mode enables auto-reload functionality
- Database tables are automatically created on application startup
- Includes RAG (Retrieval Augmented Generation) capabilities with pgvector

## 🔐 Security Features

- Clerk integration for authentication
- CORS protection
- Environment variable configuration
- Secure database connections

## 💡 Additional Information

- The application uses semantic search to provide context-aware email generation
- Supports multiple email types and lengths
- Includes comprehensive data validation
- Built with scalability in mind

# Full-Stack-Project-Python-React

A feature-rich Full-Stack-Project-Python-React application showcasing:
- FastAPI
- SQLAlchemy
- Pydantic validation
- Docker & Docker Compose
- PostgreSQL
- PEP8 compliance

## Structure

- `app/` - Main application code
- `tests/` - Unit & integration tests
- `Dockerfile` - Container build
- `docker-compose.yml` - Multi-container orchestration
- `requirements.txt` - Python dependencies
- `.env` - Local environment variables

## Usage

1. Copy `.env.example` to `.env` and set secrets.
2. Run with Docker Compose:
   ```powershell
   docker-compose up --build
   ```
3. API available at http://localhost:8000/docs

## Create Table 

1. Navigate inside the backend folder:
   ```powershell
   cd  backend
   ```

2. Run the create_table.py file to create tables inside the database:
   ```powershell
   python -m create_tables
   ```

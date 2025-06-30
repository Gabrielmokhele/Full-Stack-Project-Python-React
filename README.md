# Full-Stack-Project-Python-React

A feature-rich Full-Stack Blog Application built with:
- **FastAPI** (back-end API)
- **React** (front-end UI)
- **SQLAlchemy** (ORM for database interactions)
- **Pydantic** (data validation & schema enforcement)
- **Docker & Docker Compose** (for environment management)
- **PostgreSQL** (production-grade relational database)
- **JWT Authentication** (secure, stateless user sessions)
- **PEP8 Compliance**


## Project Overview

This project is a simple multi-user blog platform that allows:
- Users to register, log in, and create blog posts
- Only **authenticated users** can create/update/delete their own posts
- All blog posts are **publicly viewable**, including the author’s email
- Authentication is handled using **JWT tokens**
- Ownership checks enforce that only authors can manage their own content


## Project Structure
```
Full-Stack-Project-Python-React/
│
├── backend/ 
│ ├── app/ 
│ ├── tests/ 
│ ├── .env
│ ├── .env.example
│ ├── create_tables.py 
│ ├── Dockerfile
│ └── requirements.txt  
│
├── frontend/
│ ├── public/ 
│ ├── src/ 
│ ├── Dockerfile
│ ├── jsconfig.json
│ └── package.json
│
├── .gitignore
├── docker-compose.yml 
└── README.md 
```

## Technologies Used

- `FastAPI` for a modern async RESTful API with automatic docs
- `PostgreSQL` for reliable data storage
- `React` + `React Router` for a smooth single-page UI
- `Axios` for all HTTP communication
- `JWT` for secure authentication
- `Material UI` for modern styling
- `Docker Compose` for full-stack orchestration

## Usage

#### Backend Setup
1. Copy `.env.example` to `.env` and set secrets.

2. API available at http://localhost:8000/docs 

3. Navigate inside the backend folder:
   ```powershell
   cd  backend
   ```
4. Install all dependencies inside the requirements.txt file:
   ```powershell
   pip install -r requirements.txt
   ```

5. Run the create_table.py file to create tables inside the database:
   ```powershell
   python -m create_tables
   ```
6. Run the script below file to run the  main FASTAPI server:
   ```powershell
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

#### frontend Setup

7. Navigate inside the frontend folder:
   ```powershell
   cd  frontend
   ```
8. Install all dependencies inside the package.json file:
   ```powershell
   npm install
   ```
9. Run the script below file to run the  React App client:
   ```powershell
   npm start
   ```

#### Docker Usage

10. Run with Docker Compose:
   ```powershell
   docker-compose up --build
   ```

## Authentication & Authorization
- Registration: POST /users
- Login: POST /token (returns access_token)
- Protected Routes:
1. POST /posts (create post)
2. PUT /posts/{post_id} (update only your post)
3. DELETE /posts/{post_id} (delete only your post)
- JWT is sent via the Authorization: Bearer <token> header

## Frontend Features
- Register / Login / Logout functionality
- Conditional rendering:
- Navbar updates based on auth status
- "Create", "Edit", "Delete" only visible for post owners
- Posts displayed with: Title, Content, Author Email (public)
- Like / Comment actions (locally managed)
- Protected client-side routes using react-router-dom

## Design Decisions
- JWT is stored in localStorage for persistence across reloads
Note: In production, HttpOnly cookies would be more secure.
- API requests are centralized in a custom Axios instance that automatically includes the token
- Frontend state is managed via AuthContext to maintain login state globally
- DB switched from in-memory to PostgreSQL to support realistic app scenarios

## Bonus Tasks Completed
- Dockerized Frontend and Backend with Compose
- JWT Authentication & Authorization
- Ownership enforcement on post updates/deletes
- Live API docs via FastAPI Swagger
- Posts include author's email
- Frontend handles auth flow + conditional rendering
- Protected routes using client-side auth checks
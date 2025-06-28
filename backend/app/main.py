from fastapi import FastAPI
from app.api import users, auth, posts

app = FastAPI()

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(posts.router)

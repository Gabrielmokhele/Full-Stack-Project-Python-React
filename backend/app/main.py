from fastapi import FastAPI
from app.api import users, auth, posts
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,
    allow_methods=["*"],         
    allow_headers=["*"],         
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(posts.router)

from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: UUID

    class Config:
        from_attributes = True

class UserWithPosts(UserRead):
    posts: list["PostRead"] = []

    class Config:
        from_attributes = True

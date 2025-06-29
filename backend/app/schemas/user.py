from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: UUID
    email: str

    class Config:
        from_attributes = True

class TokenWithUser(BaseModel):
    access_token: str
    token_type: str
    user: UserRead

    class Config:
        from_attributes = True


class UserWithPosts(UserRead):
    posts: list["PostRead"] = []

    class Config:
        from_attributes = True

from app.schemas.post import PostRead

UserWithPosts.model_rebuild()

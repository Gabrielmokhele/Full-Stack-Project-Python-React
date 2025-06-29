from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID
from app.schemas.user import UserRead



class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostRead(PostBase):
    id: UUID
    publication_date: datetime
    owner_id: UUID

    class Config:
        from_attributes = True

class PostWithOwner(PostRead):
    owner: UserRead

    class Config:
        from_attributes = True



PostWithOwner.model_rebuild()

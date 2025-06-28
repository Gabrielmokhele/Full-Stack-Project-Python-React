from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.schemas.post import PostCreate, PostRead
from app.models.post import Post
from app.services.database import get_db
from app.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/posts", response_model=PostRead)
def create_post(post_in: PostCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    post = Post(**post_in.dict(), owner_id=user.id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@router.get("/posts", response_model=list[PostRead])
def get_all_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()

@router.get("/posts/{post_id}", response_model=PostRead)
def get_post(post_id: UUID, db: Session = Depends(get_db)):
    post = db.query(Post).get(post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Not found")
    return post

@router.put("/posts/{post_id}", response_model=PostRead)
def update_post(post_id: UUID, post_in: PostCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    post = db.query(Post).get(post_id)
    if not post or post.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    post.title = post_in.title
    post.content = post_in.content
    db.commit()
    return post

@router.delete("/posts/{post_id}")
def delete_post(post_id: UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    post = db.query(Post).get(post_id)
    if not post or post.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    db.delete(post)
    db.commit()
    return {"msg": "Deleted"}

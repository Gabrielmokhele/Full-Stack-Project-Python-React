from app.services.database import Base, engine
from app.models.user import User
from app.models.post import Post

def create_tables():
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    create_tables()

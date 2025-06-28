import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)  

def test_read_posts():
    response = client.get("/posts/") 
    assert response.status_code == 200
    assert isinstance(response.json(), list)

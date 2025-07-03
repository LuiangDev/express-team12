from fastapi.testclient import TestClient
from fastapi import status

def test_hello(client: TestClient):
  response = client.get('/email')
  assert response.status_code == status.HTTP_200_OK
  assert response.headers["content-type"] == "application/json"
  assert response.json() == {
    'message': 'Hello World!' 
  }

def test_generate_email_invalid(client: TestClient):
  response = client.post("/email/generate")
  assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

def test_generate_email_successfull(client: TestClient):
  response = client.post(
    "/email/generate",
    json={"type": "bienvenida", "tone": "casual", "length": "pequeño", "message": "John Doe"},
  )
  assert response.status_code == status.HTTP_201_CREATED
  assert response.headers["content-type"] == "application/json"

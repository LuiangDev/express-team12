from fastapi.testclient import TestClient
from fastapi import status

def test_hello(client: TestClient):
  response = client.get('/email')
  assert response.status_code == status.HTTP_200_OK
  assert response.headers["content-type"] == "application/json"
  assert response.json() == {
    'message': 'Hello World!' 
  }
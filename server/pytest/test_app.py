from fastapi.testclient import TestClient
from fastapi import status

def test_get_consults(client: TestClient):
  response = client.get('/hello')
  assert response.status_code == status.HTTP_200_OK
  assert response.headers["content-type"] == "application/json"
  assert response.json() == {
    'message': 'Hello World!' 
  }
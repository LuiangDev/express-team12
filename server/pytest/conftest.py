from fastapi.testclient import TestClient
from dotenv import load_dotenv
import pytest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from api.main import app

load_dotenv()

@pytest.fixture(name='client')
def client_fixture():
  client = TestClient(app)
  yield client
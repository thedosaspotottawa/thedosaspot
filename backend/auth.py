import os
from fastapi import HTTPException
from pydantic import BaseModel

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
if not ADMIN_PASSWORD:
    raise ValueError("ADMIN_PASSWORD environment variable is not set")

def verify_admin(password: str):
    if password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

class AdminLoginRequest(BaseModel):
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    message: str

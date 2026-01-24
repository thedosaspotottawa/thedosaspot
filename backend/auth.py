import os
from fastapi import HTTPException

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "dosa123")

def verify_admin(password: str):
    if password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")

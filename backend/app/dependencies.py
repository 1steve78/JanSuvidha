import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

# OAuth2 scheme for token extraction from "Authorization: Bearer <token>"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey_change_me_in_prod")
ALGORITHM = "HS256"

def get_current_admin(token: str = Depends(oauth2_scheme)):
    """
    Validates the JWT token.
    Raises 401 if invalid or expired.
    Returns the username if valid.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # Optional: further check if username matches the current environment admin
    expected_admin = os.getenv("ADMIN_USERNAME", "admin")
    if username != expected_admin:
        raise credentials_exception

    return username

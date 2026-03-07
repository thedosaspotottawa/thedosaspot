# JWT Authentication Implementation - Complete Guide

## Overview

Implemented industry-standard **JWT (JSON Web Token)** authentication to replace password-based authentication. This provides a secure, stateless, and scalable authentication system.

## What Changed

### Before (Insecure):
```javascript
// Password sent with every request
await axios.put('/reservations/1', { status, password: 'admin123' });
await axios.delete('/menu/items/5?password=admin123');
```

### After (Secure):
```javascript
// Login once, get token
const { token } = await axios.post('/auth/login', { password });
localStorage.setItem('adminToken', token);

// Use token for all subsequent requests
await axios.put('/reservations/1', 
    { status }, 
    { headers: { Authorization: 'Bearer <token>' } }
);
await axios.delete('/menu/items/5',
    { headers: { Authorization: 'Bearer <token>' } }
);
```

## Implementation Details

### Backend Changes

#### 1. **New Dependencies** (`requirements.txt`)
```
python-jose[cryptography]  # JWT encoding/decoding
passlib[bcrypt]           # Password hashing (for future use)
```

#### 2. **Auth System** (`backend/auth.py`)

**JWT Configuration:**
```python
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours
```

**Key Functions:**
- `create_access_token()` - Creates JWT with expiration
- `verify_token()` - Validates JWT from Authorization header
- `verify_admin_token()` - FastAPI dependency for protected endpoints
- `verify_password()` - Checks admin password

#### 3. **Login Endpoint** (`backend/main.py`)
```python
@app.post("/auth/login")
async def admin_login(request: AdminLoginRequest):
    if verify_password(request.password):
        access_token = create_access_token(data={"admin": True})
        return {
            "success": True,
            "message": "Authentication successful",
            "token": access_token
        }
```

#### 4. **Protected Endpoints**

All admin endpoints now use JWT dependency:

```python
@router.put("/{reservation_id}")
async def update_reservation_status(
    reservation_id: int,
    update_data: ReservationStatusUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_token)  # ← JWT verification
):
    # No password needed in request!
    ...
```

**Updated Routers:**
- ✅ `/reservations` - PUT, DELETE
- ✅ `/menu/categories` - POST, PUT, DELETE
- ✅ `/menu/items` - POST, PUT, DELETE
- ✅ `/banners` - POST, PUT, DELETE

#### 5. **Schema Changes** (`backend/schemas.py`)

Removed password from all request schemas:
```python
# Before
class MenuItemCreate(MenuItemBase):
    category_id: int
    password: str  # ❌ Removed

# After
class MenuItemCreate(MenuItemBase):
    category_id: int  # ✅ No password needed
```

### Frontend Changes

#### 1. **Token Management** (`Admin.jsx`)

**State:**
```javascript
const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
const [isAuthenticated, setIsAuthenticated] = useState(false);
```

**Login Flow:**
```javascript
const handleLogin = async (e) => {
    const response = await axios.post(`${API_URL}/auth/login`, { password });
    if (response.data.success && response.data.token) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem('adminToken', newToken);
        setIsAuthenticated(true);
        setPassword(''); // Clear password
    }
};
```

**Logout Flow:**
```javascript
const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
    localStorage.removeItem('adminToken');
};
```

#### 2. **Auth Header Helper**
```javascript
const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
});
```

#### 3. **API Calls Updated**

All admin API calls now use JWT:

```javascript
// Reservations
await axios.put(`${API_URL}/reservations/${id}`, 
    { status }, 
    getAuthHeaders()
);
await axios.delete(`${API_URL}/reservations/${id}`, getAuthHeaders());

// Menu
await axios.post(`${API_URL}/menu/items`, payload, getAuthHeaders());
await axios.delete(`${API_URL}/menu/items/${id}`, getAuthHeaders());

// Banners
await axios.post(`${API_URL}/banners`, payload, getAuthHeaders());
await axios.delete(`${API_URL}/banners/${id}`, getAuthHeaders());
```

#### 4. **Auto-Logout on 401**
```javascript
catch (err) {
    if (err.response?.status === 401) {
        handleLogout(); // Token expired or invalid
    }
    alert(err.response?.data?.detail);
}
```

#### 5. **Persistent Sessions**

Token is saved in `localStorage`, so users stay logged in across page refreshes:
```javascript
useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
    }
}, []);
```

## Security Benefits

### ✅ **No Password in Requests**
- Password only sent once during login
- All subsequent requests use token

### ✅ **Token Expiration**
- Tokens expire after 8 hours
- Automatic logout when expired
- Forces re-authentication

### ✅ **Encrypted over HTTPS**
- Authorization header is encrypted
- Token not visible in logs or cache

### ✅ **Stateless Authentication**
- No server-side session storage
- Scalable across multiple servers
- Token contains all necessary info

### ✅ **Standard Industry Practice**
- OAuth 2.0 Bearer token pattern
- Compatible with API gateways
- Easy to integrate with other services

## API Flow

### 1. **Login**
```http
POST /auth/login
Content-Type: application/json

{
  "password": "admin123"
}

Response:
{
  "success": true,
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. **Protected Request**
```http
DELETE /reservations/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response:
{
  "message": "Reservation deleted successfully",
  "id": 1
}
```

### 3. **Token Expired/Invalid**
```http
Response (401):
{
  "detail": "Could not validate credentials"
}
```

## Token Structure

JWT contains:
```json
{
  "admin": true,
  "exp": 1706150400  // Expiration timestamp
}
```

Decoded example:
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "admin": true, "exp": 1706150400 }
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

## Configuration

### Environment Variables

**Required:**
```bash
ADMIN_PASSWORD=your_secure_password_here
```

**Optional (recommended for production):**
```bash
JWT_SECRET_KEY=your-random-secret-key-min-32-chars
```

Generate a secure secret key:
```python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Token Duration

Adjust in `backend/auth.py`:
```python
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours (default)
# Or change to:
# ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour
# ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours
```

## Testing

### 1. **Test Login**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. **Test Protected Endpoint**
```bash
TOKEN="your_token_here"

curl -X GET http://localhost:8000/reservations \
  -H "Authorization: Bearer $TOKEN"
```

### 3. **Test Token Expiration**
Wait 8 hours or manually decode and check expiration:
```python
from jose import jwt

token = "your_token_here"
payload = jwt.decode(token, options={"verify_signature": False})
print(payload)  # Check 'exp' timestamp
```

## Migration Notes

### Breaking Changes

✅ **Intentional** - This is a security improvement:
- Old endpoints expecting password in body will fail
- Query parameters with password no longer work
- All admin operations now require JWT token

### Deployment Steps

1. **Update backend:**
   ```bash
   cd backend
   source venv/bin/activate
   pip install 'python-jose[cryptography]' 'passlib[bcrypt]'
   ```

2. **Set environment variable:**
   ```bash
   export ADMIN_PASSWORD=your_password
   # Optional:
   export JWT_SECRET_KEY=$(python -c "import secrets; print(secrets.token_urlsafe(32))")
   ```

3. **Restart servers:**
   ```bash
   ./start.sh
   ```

4. **Test login:**
   - Open admin panel
   - Login with password
   - Verify token is saved in localStorage
   - Test admin operations

### Backward Compatibility

❌ **Not backward compatible** (by design for security):
- Old API clients must be updated
- Mobile apps must implement JWT flow
- Third-party integrations need updating

## Troubleshooting

### "Could not validate credentials"
- **Cause:** Token expired or invalid
- **Solution:** Login again to get new token

### "Invalid authentication credentials"
- **Cause:** Malformed token or missing admin claim
- **Solution:** Check token format and claims

### "Authorization header missing"
- **Cause:** Request sent without token
- **Solution:** Ensure `Authorization: Bearer <token>` header is present

### Token not persisting
- **Cause:** localStorage disabled or cleared
- **Solution:** Check browser settings, try incognito mode

## Best Practices

### ✅ **DO:**
- Store token in localStorage for persistence
- Clear token on logout
- Set appropriate token expiration
- Use HTTPS in production
- Rotate SECRET_KEY periodically

### ❌ **DON'T:**
- Don't store password in state after login
- Don't log tokens to console
- Don't share tokens between users
- Don't use default SECRET_KEY in production
- Don't set expiration too long (max 24 hours)

## Future Enhancements

Potential improvements:
1. **Refresh Tokens** - Long-lived tokens to get new access tokens
2. **Role-Based Access** - Different permissions for different admin levels
3. **Token Revocation** - Blacklist of invalidated tokens
4. **Multiple Admins** - User accounts instead of single password
5. **2FA** - Two-factor authentication
6. **Password Hashing** - Hash passwords in database (currently env var only)
7. **Audit Log** - Track all admin actions with timestamps

## Security Checklist

- ✅ JWT tokens used for authentication
- ✅ Tokens expire after 8 hours
- ✅ Tokens stored securely in localStorage
- ✅ Auto-logout on token expiration
- ✅ Authorization header used (not query params)
- ✅ Password only sent once during login
- ✅ Token signature prevents tampering
- ⚠️ **TODO:** Set unique JWT_SECRET_KEY in production
- ⚠️ **TODO:** Use HTTPS in production

## Files Modified

### Backend:
- ✅ `backend/requirements.txt` - Added JWT dependencies
- ✅ `backend/auth.py` - Complete rewrite with JWT
- ✅ `backend/main.py` - Updated login endpoint
- ✅ `backend/schemas.py` - Removed password fields
- ✅ `backend/routers/reservations.py` - JWT authentication
- ✅ `backend/routers/menu.py` - JWT authentication
- ✅ `backend/routers/banners.py` - JWT authentication

### Frontend:
- ✅ `frontend/src/components/Admin.jsx` - Complete JWT integration

## Status: ✅ COMPLETE

JWT authentication is fully implemented and tested:
- ✅ Secure token-based authentication
- ✅ No passwords in requests
- ✅ Token expiration and auto-logout
- ✅ Persistent sessions via localStorage
- ✅ All admin endpoints protected
- ✅ Proper error handling
- ✅ Industry-standard implementation

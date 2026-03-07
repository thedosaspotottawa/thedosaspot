# Security Fix - Password in Request Body

## Issue
Previously, the DELETE endpoint accepted the password as a query parameter:
```
DELETE /reservations/1?password=admin123
```

This was **insecure** because:
- ❌ **Server logs** - Password appears in access logs
- ❌ **Browser history** - Password saved in browser history  
- ❌ **Network monitoring** - Visible in plain text in URL
- ❌ **Referrer headers** - Can leak to third-party sites
- ❌ **Proxy servers** - Cached in proxy logs

## Solution
Changed to send password in the **request body** instead:

```
DELETE /reservations/1
Content-Type: application/json

{
  "password": "admin123"
}
```

## Changes Made

### Backend

**File: `backend/schemas.py`**
Added new schema for delete requests:
```python
class ReservationDelete(BaseModel):
    password: str
```

**File: `backend/routers/reservations.py`**
Updated the DELETE endpoint:
```python
@router.delete("/{reservation_id}")
async def delete_reservation(
    reservation_id: int,
    delete_data: ReservationDelete,  # ← Request body instead of query param
    db: Session = Depends(get_db)
):
    verify_admin(delete_data.password)
    # ... rest of the code
```

### Frontend

**File: `frontend/src/components/Admin.jsx`**
Updated the API call to send password in body:
```javascript
await axios.delete(`${API_URL}/reservations/${id}`, {
    data: { password }  // ← Password in request body
});
```

## Security Benefits

✅ **Not in logs** - Request body is not logged by default  
✅ **Not in browser history** - URLs don't contain sensitive data  
✅ **HTTPS encrypted** - Body is encrypted over HTTPS  
✅ **Not in cache** - Proxies don't cache POST/DELETE bodies  
✅ **No referrer leak** - Password won't appear in referrer headers  

## API Changes

### Before (Insecure):
```bash
# Query parameter - INSECURE
curl -X DELETE "http://localhost:8000/reservations/1?password=admin123"
```

### After (Secure):
```bash
# Request body - SECURE
curl -X DELETE "http://localhost:8000/reservations/1" \
  -H "Content-Type: application/json" \
  -d '{"password": "admin123"}'
```

## Testing

The change is **backward incompatible** (intentionally, for security):
- ✅ Old query parameter method will **no longer work**
- ✅ Must use new request body method
- ✅ Frontend updated to use new method
- ✅ All delete operations work correctly

### Test Checklist:
- ✅ Password sent in request body
- ✅ Password not visible in browser DevTools Network tab URL
- ✅ Delete still requires authentication
- ✅ Invalid password returns 401
- ✅ Valid password deletes successfully
- ✅ Frontend delete button works
- ✅ Calendar delete button works

## Best Practices Applied

1. **Sensitive data in body** - Never in URL/query params
2. **Use HTTPS in production** - Encrypts entire request including body
3. **Consistent pattern** - Other admin endpoints (PUT /reservations) also use body
4. **Proper HTTP method** - DELETE with body is valid and supported

## Additional Security Recommendations

For future enhancements, consider:

### 1. JWT Token Authentication
Instead of sending password with every request:
```javascript
// Login once, get token
const { token } = await axios.post('/auth/login', { password });

// Use token for subsequent requests
await axios.delete(`/reservations/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
```

### 2. Session-based Authentication
```javascript
// Login creates server-side session
await axios.post('/auth/login', { password });

// Subsequent requests use session cookie
await axios.delete(`/reservations/${id}`); // No password needed
```

### 3. API Key Authentication
For programmatic access:
```javascript
await axios.delete(`/reservations/${id}`, {
    headers: { 'X-API-Key': 'secret-key' }
});
```

## Current Implementation Status

✅ **Secure** - Password in request body  
✅ **HTTPS recommended** - Use in production for encryption  
✅ **Consistent** - Matches other admin endpoints  
✅ **Tested** - All functionality working  

## Deployment Notes

- **Breaking change** - Old API calls will fail (by design)
- **Frontend updated** - No manual changes needed
- **Backend compatible** - Works with existing infrastructure
- **No migration needed** - No database changes

## Files Modified

- ✅ `backend/schemas.py` - Added ReservationDelete schema
- ✅ `backend/routers/reservations.py` - Updated DELETE endpoint
- ✅ `frontend/src/components/Admin.jsx` - Updated API call

## Status: ✅ FIXED

The security vulnerability has been resolved. Password is now sent securely in the request body instead of the URL query parameters.

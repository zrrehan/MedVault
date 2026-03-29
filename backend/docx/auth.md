# 🔐 Signup API

Creates a new user account in the system.

## 📌 Endpoint

`POST /auth/signup`

#
## 📥 Request Body

```json
{
  "email": "rehan1@gmail.com",
  "name": "rehan",
  "password": "password123",
  "role": "SELLER", 
  "profilePicture": "something.png"
}
```

## Response
```json
{
  "success": true,
  "message": "User is created successfully!!",
  "data": {
    "id": "3f1a8739-1bb1-438b-864e-1f1518b7f8fa",
    "email": "rehan1@gmail.com",
    "name": "rehan",
    "role": "SELLER",
    "profilePicture": "something.png",
    "createdAt": "2026-03-28T18:47:40.641Z",
    "updatedAt": "2026-03-28T18:47:40.641Z",
    "token": "JWT_TOKEN"
  }
}
```

# 🔐 Login API

Authenticates a user and returns a JWT token for authorized access.

---

## 📌 Endpoint

`POST /auth/login`

---

## 📥 Request Body

```json
{
  "email": "rehan1@gmail.com",
  "password": "password123"
}
```

## Response
```json
{
  "success": true,
  "message": "User login successful!!!",
  "data": {
    "id": "3f1a8739-1bb1-438b-864e-1f1518b7f8fa",
    "email": "rehan1@gmail.com",
    "name": "rehan",
    "role": "CUSTOMER",
    "profilePicture": "https://i.ibb.co.com/hxDhZ9Pz/img.jpg",
    "createdAt": "2026-03-28T18:47:40.641Z",
    "updatedAt": "2026-03-28T18:47:40.641Z",
    "token": "JWT_TOKEN"
  }
}
```
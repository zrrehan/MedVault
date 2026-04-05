# Create Order 🛒

**Endpoint:**  
`POST http://localhost:8080/order/post-order`

**Authorization:**  
Bearer Token required (SELLER)
`Authorization: Bearer <your_token>`

---

### Request Body

```json
{
  "userId": "b79ccb20-7929-4170-ac20-2ce426063da0",
  "sold_data": [
    {
      "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
      "quantity": 2
    },
    {
      "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
      "quantity": 1
    },
    {
      "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
      "quantity": 5
    }
  ]
}
```

### Response 
```json 
{
    "success": true,
    "message": "Order has created successfully!",
    "data": {
        "id": "983a5e1f-584a-462c-a472-eb398910edab",
        "delivery_state": "PENDING",
        "payment_state": "PENDING",
        "userId": "b79ccb20-7929-4170-ac20-2ce426063da0",
        "sold_dataResult": [
            {
                "id": "37aef88e-2e44-48d1-998b-4fe51aa4f334",
                "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
                "quantity": 2,
                "priceAtPurchase": 250,
                "orderId": "983a5e1f-584a-462c-a472-eb398910edab"
            },
            {
                "id": "716b627b-cad0-4669-a9a4-5bced8d33d87",
                "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
                "quantity": 1,
                "priceAtPurchase": 250,
                "orderId": "983a5e1f-584a-462c-a472-eb398910edab"
            },
            {
                "id": "178ff657-f3e8-42b4-a3ea-f1759b2460a3",
                "medicineId": "0e70245b-8033-45ca-8b64-51f0724743de",
                "quantity": 5,
                "priceAtPurchase": 250,
                "orderId": "983a5e1f-584a-462c-a472-eb398910edab"
            }
        ]
    }
}
```

# 📦 Get Specific User's Orders API

Retrieve all orders for the authenticated user.

---

## 🔗 Endpoint

GET http://localhost:8080/order/get-orders

---

## 🔐 Authorization

Requires a Bearer Token.

Authorization: Bearer <your_token>

---

## ✅ Response

### Success Response

```json
{
  "success": true,
  "message": "All Order of this user fetched!",
  "data": [
    {
      "id": "string",
      "delivery_state": "PENDING | SHIPPED | DELIVERED",
      "payment_state": "PENDING | PAID | FAILED",
      "userId": "string",
      "sold_data": [
        {
          "id": "string",
          "medicineId": "string",
          "quantity": number,
          "priceAtPurchase": number,
          "orderId": "string",
          "medicine": {
            "id": "string",
            "name": "string",
            "price": number,
            "stockQuantity": number,
            "seller_id": "string",
            "category": ["string"],
            "is_active": boolean,
            "manufacturer": "string",
            "image": "string (URL)",
            "description": "string",
            "createdAt": "ISO Date",
            "updatedAt": "ISO Date"
          }
        }
      ]
    }
  ]
}
```
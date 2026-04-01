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
# Get All Medicines (Search) (PUBLIC ROUTE)

## Route
GET http://localhost:8080/posts/all-medicine?search=(search-term)

## Query Parameters
| Parameter | Type   | Description                       |
|-----------|--------|-----------------------------------|
| search    | string | (Optional) Text to search medicine names. Case-insensitive. |

## Response Example
```json
{
  "success": true,
  "message": "Searched Medicine got successfully",
  "data": [
    {
      "id": "07e63b00-f7af-4a95-a57f-d3b559a38a2b",
      "name": "Paracetamol 500mg",
      "price": 120,
      "stockQuantity": 50,
      "seller_id": "795fad36-6774-4dc8-8e19-e4367e17d59a",
      "category": ["Painkiller", "Fever"],
      "is_active": true,
      "manufacturer": "HealthPharma Ltd.",
      "image": "https://example.com/images/paracetamol.jpg",
      "description": "Paracetamol 500mg tablets for relief of fever and mild pain.",
      "createdAt": "2026-03-29T14:59:10.820Z",
      "updatedAt": "2026-03-29T14:59:10.820Z"
    }, 
    {
      "id": "07e63b00-f7af-4a95-a57f-d3b559a38a2b",
      "name": "Paracetamol 150mg",
      "price": 120,
      "stockQuantity": 50,
      "seller_id": "795fad36-6774-4dc8-8e19-e4367e17d59a",
      "category": ["Painkiller", "Fever"],
      "is_active": true,
      "manufacturer": "HealthPharma Ltd.",
      "image": "https://example.com/images/paracetamol.jpg",
      "description": "Paracetamol 500mg tablets for relief of fever and mild pain.",
      "createdAt": "2026-03-29T14:59:10.820Z",
      "updatedAt": "2026-03-29T14:59:10.820Z"
    }
  ]
}
```
--
## Description
Returns a list of medicines whose names **contain the search term**, ignoring case.  
If no search term is provided, returns all medicines.

# Create Medicine 💊

**Endpoint:**  
`POST http://localhost:8080/posts/create`

**Authorization:**  
Bearer Token required  
`Authorization: Bearer <your_token>`

---

### Request Body

```json
{
  "name": "Azithromycin 250mg",
  "price": 250,
  "stockQuantity": 30,
  "seller_id": "dcee7d3f-8238-486b-8fc5-59e8b50d9549",
  "category": ["Antibiotic"],
  "is_active": true,
  "manufacturer": "GlobalPharma Ltd.",
  "image": "https://example.com/images/azithromycin.jpg",
  "description": "Azithromycin 250mg tablets for bacterial infections."
}
```

### Success Respone 
```json
{
  "success": true,
  "message": "Medicine created Successful",
  "data": {
    "id": "0e70245b-8033-45ca-8b64-51f0724743de",
    "name": "Azithromycin 250mg",
    "price": 250,
    "stockQuantity": 30,
    "seller_id": "dcee7d3f-8238-486b-8fc5-59e8b50d9549",
    "category": ["Antibiotic"],
    "is_active": true,
    "manufacturer": "GlobalPharma Ltd.",
    "image": "https://example.com/images/azithromycin.jpg",
    "description": "Azithromycin 250mg tablets for bacterial infections.",
    "createdAt": "2026-03-30T20:11:43.847Z",
    "updatedAt": "2026-03-30T20:11:43.847Z"
  }
}
```
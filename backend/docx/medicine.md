# Get All Medicines (Search)

## Route
GET http://localhost:8080/posts/all-medicine?search=<search-term>

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

## Description
Returns a list of medicines whose names **contain the search term**, ignoring case.  
If no search term is provided, returns all medicines.
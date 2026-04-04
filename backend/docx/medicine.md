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

# Edit Medicine 💊✅

**Endpoint:**  
`PUT http://localhost:8080/posts/edit-medicine`

**Authorization:**  
Bearer Token required  
`Authorization: Bearer <your_token>`

---

### Request Body

```json
{
  "medicineId": "1ce8c7de-74ec-4726-86e7-d81f994b8515",
  "newData": {
    "name": "Axivition 250mg",
    "price": 1000,
    "stockQuantity": 200
    // You can include any other fields from the medicine table, e.g., category, is_active, manufacturer, image, description
  }
}
```

### Response 
```json
{
  "success": true,
  "message": "Medicine Edited Successfully",
  "data": {
    "id": "1ce8c7de-74ec-4726-86e7-d81f994b8515",
    "name": "Axivition 250mg",
    "price": 1000,
    "stockQuantity": 200,
    "seller_id": "dcee7d3f-8238-486b-8fc5-59e8b50d9549",
    "category": ["Antibiotic"],
    "is_active": true,
    "manufacturer": "GlobalPharma Ltd.",
    "image": "https://example.com/images/azithromycin.jpg",
    "description": "Azithromycin 250mg tablets for bacterial infections.",
    "createdAt": "2026-03-30T20:04:30.029Z",
    "updatedAt": "2026-03-30T20:26:07.073Z"
  }
}
```

# `GET` /posts/my-posted-medicies 💊💊

> 🔐 Requires Bearer Token — Seller only

**Base URL:** `http://localhost:8080`

**Query Parameters:**

| Parameter  | Type     | Required | Description              |
|------------|----------|----------|--------------------------|
| `sellerId` | `string` | ✅ Yes   | The UUID of the seller   |
| `search`   | `string` | ❌ No    | Search keyword (e.g. `Az`) |

**Request Header:**
```http
Authorization: Bearer <token>
```

**Example Request:**
```http
GET http://localhost:8080/posts/my-posted-medicies?sellerId=dcee7d3f-8238-486b-8fc5-59e8b50d9549&search=Az
```

**Success Response `200 OK`:**
```json
{
  "success": true,
  "message": "Searched Medicine got successfully",
  "data": [
    {
      "id": "7269f933-dfeb-4654-93ff-98faa09e94d5",
      "name": "Azithromycin 250mg",
      "price": 250,
      "stockQuantity": 120,
      "seller_id": "dcee7d3f-8238-486b-8fc5-59e8b50d9549",
      "category": ["Antibiotic", "Painkiller"],
      "is_active": true,
      "manufacturer": "GlobalPharma Ltd.",
      "image": "https://www.biofieldpharma.com/wp-content/uploads/2023/06/BIOFIELD-OZISET-250-TAB-1-scaled.jpg",
      "description": "Azithromycin 250 mg is a broad-spectrum antibiotic used to treat bacterial infections...",
      "createdAt": "2026-04-03T14:21:54.606Z",
      "updatedAt": "2026-04-03T14:21:54.606Z"
    }
  ]
}
```
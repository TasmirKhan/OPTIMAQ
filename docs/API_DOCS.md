# OPTIMAQ API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All API endpoints except authentication require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

## Metrics

### Get Metrics
```http
GET /metrics
```

**Query Parameters:**
- `type` (optional): Filter by metric type (cpu, memory, network, users)
- `limit` (optional): Number of records to return (default: 100)

**Response:**
```json
{
  "cpu": [
    {"time": "2024-01-01T00:00:00Z", "usage": 45.2},
    ...
  ],
  "memory": [
    {"time": "2024-01-01T00:00:00Z", "usage": 67.8},
    ...
  ]
}
```

### Simulate Metrics
```http
POST /metrics/simulate
```

Generates random metrics data for testing.

## Resources

### Get Resources
```http
GET /resources
```

**Response:**
```json
[
  {
    "id": "resource-id",
    "name": "API Gateway",
    "type": "API",
    "description": "Main API endpoint",
    "status": "active",
    "tags": ["production", "critical"],
    "createdBy": {
      "name": "User Name",
      "email": "user@example.com"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Create Resource
```http
POST /resources
```

**Request Body:**
```json
{
  "name": "Database Server",
  "type": "Database",
  "description": "PostgreSQL production server",
  "tags": ["production", "database"]
}
```

### Update Resource
```http
PUT /resources/:id
```

**Request Body:**
```json
{
  "name": "Updated Database Server",
  "status": "maintenance"
}
```

### Delete Resource
```http
DELETE /resources/:id
```

## Reports

### Get Reports
```http
GET /reports
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Monthly Performance Report",
    "generatedAt": "2024-01-15T10:00:00Z",
    "size": "2.3 MB",
    "downloadUrl": "/api/reports/download/1"
  }
]
```

### Generate Report
```http
POST /reports/generate
```

**Request Body:**
```json
{
  "type": "performance",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

### Download Report
```http
GET /reports/download/:id
```

Returns the report file as attachment.

## Error Responses

All endpoints may return the following error formats:

**400 Bad Request:**
```json
{
  "message": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "message": "Access token required"
}
```

**403 Forbidden:**
```json
{
  "message": "Insufficient permissions"
}
```

**404 Not Found:**
```json
{
  "message": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Server error",
  "error": "Detailed error message"
}
```

## Rate Limiting

API endpoints are rate limited to 100 requests per 15 minutes per IP address.

## WebSocket Events

The server supports real-time updates via Socket.io:

- Connect to `ws://localhost:5000`
- Listen for `metrics-update` events for real-time metric data
- Listen for `alert` events for system alerts
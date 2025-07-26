# High-Level Design Document

## Project: Order Management System (OMS)

---

## Objective

To build a scalable and real-time Order Management System that supports CRUD operations for orders, products, and customers, enforces a strict status pipeline (`PENDING → PAID → FULFILLED → CANCELLED`), and delivers live status updates to the frontend using WebSockets.

---

## 1. Architecture Overview

### Separation of Concerns

- **Frontend (Next.js / React)**  
  Responsible for UI rendering, handling user interactions, and listening to real-time WebSocket updates.

- **API Server (Fastify/Express + Node.js)**  
  Handles REST API requests and WebSocket broadcasts. Manages business logic, authentication, and data validation.

- **Database (PostgreSQL or MongoDB)**  
  Stores structured data for users, orders, products, and order items. Enforces relational constraints and indexing.

---

### Request-Response and Event Flow

```mermaid
sequenceDiagram
  participant Client
  participant API_Server
  participant Database
  participant WebSocket

  Client->>API_Server: PATCH /api/orders/:id (Update status)
  API_Server->>Database: Update order (validate pipeline)
  Database-->>API_Server: Success
  API_Server->>WebSocket: Emit "orderStatusUpdated"
  WebSocket-->>Client: Update order status on UI

---

 ## 2. Component Breakdown
Frontend
Pages

/orders: Lists all orders

/products: Lists products

/customers: Manage customer data

Shared Components

OrderTable

FilterBar

StatusBadge

State Management

React Context + useReducer

Optional Redux Toolkit (for scaling)

API Layer
routes: Define endpoints (/api/orders, /api/products)

controllers: Handle validation and service orchestration

services: Perform business logic (e.g., validate transitions)

data-access: Abstract DB operations using models or ORM
 ---
 ## 3. Database Schema (ER Diagram)
erDiagram
  USERS ||--o{ ORDERS : places
  PRODUCTS ||--o{ ORDER_ITEMS : includes
  ORDERS ||--|{ ORDER_ITEMS : contains

  USERS {
    uuid id PK
    string name
    string role
  }

  ORDERS {
    uuid id PK
    string status
    timestamp created_at
    uuid user_id FK
  }

  PRODUCTS {
    uuid id PK
    string name
    float price
  }

  ORDER_ITEMS {
    uuid id PK
    uuid order_id FK
    uuid product_id FK
    integer quantity
  }
 
 ---

### Indexing Strategy:

Composite index on order_id + product_id in ORDER_ITEMS

Index status on ORDERS for faster filtering

Index user_id on ORDERS for dashboard use

###4. API Contract

| Endpoint          | Method | Request Body         | Success Response        | Error Cases           |
| ----------------- | ------ | -------------------- | ----------------------- | --------------------- |
| `/api/orders`     | GET    | —                    | `200 OK: Order[]`       | `500 Internal Server` |
| `/api/orders/:id` | PATCH  | `{ status: "PAID" }` | `200 OK: Updated Order` | `400 Invalid Status`  |
| `/api/products`   | GET    | —                    | `200 OK: Product[]`     | `500 Internal Server` |
| `/api/customers`  | GET    | —                    | `200 OK: User[]`        | `500 Internal Server` |

###5. Sequence Diagram: “Place Order”

sequenceDiagram
  participant Client
  participant API
  participant DB
  participant Socket

  Client->>API: POST /api/orders
  API->>DB: Create order and order_items
  DB-->>API: Success
  API->>Socket: Emit `orderStatusUpdated`
  Socket-->>Client: UI receives order update


###6. Deployment Topology

| Service    | Platform               | Notes                          |
| ---------- | ---------------------- | ------------------------------ |
| Frontend   | Vercel / Netlify       | Auto-deploy on `main` push     |
| API Server | Render / Railway       | Fastify/Express backend        |
| DB         | Supabase / PlanetScale | Hosted PostgreSQL or MongoDB   |
| Realtime   | Built-in via Socket.IO | Socket server in same Node app |

Environment Management
Use .env files for all sensitive keys

Vercel & Render auto-manage secrets

CI/CD
GitHub Actions: run tests → lint → deploy

Vercel auto-preview deploys for PRs

###7. Security & Observability
Authentication & Authorization
NextAuth with JWT strategy

Role-based Access Control:

Admin: Can create/update/delete

Customer: View only

##Observability Tools

| Concern         | Tool               |
| --------------- | ------------------ |
| Logging         | `pino` logger      |
| Healthcheck     | `/healthz` route   |
| Error Reporting | Sentry / LogRocket |
```

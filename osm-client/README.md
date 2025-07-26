# High-Level Design Document

## Project: Order Management System

---

## 📌 Objective
The Order Management System (OMS) allows admins to view, search, filter, and monitor order statuses in real-time using a clean, responsive dashboard.

---

## ⚙️ Architecture Overview

**Client:**  
- Built with **React**
- Communicates with the backend using **REST APIs**
- Subscribes to real-time order status updates via **WebSockets (Socket.IO)**

**Server:**  
- Built with **Node.js + Express.js**
- Exposes RESTful routes for orders
- Emits status updates over WebSockets
- Uses **MongoDB** to store orders

**Database:**  
- **MongoDB** collections:
  - `orders` (orderId, customerId, products, status, createdAt)
  - `users` (if login/auth is used)

**Communication:**  
- REST API for initial data fetch  
- WebSockets for live updates (e.g., `orderStatusUpdated` events)

---

## 🧱 System Components

### 1. Frontend (React)
- **OrderList.jsx** – Lists all orders, supports search & filter
- **OrderDetails.jsx** – (Optional) View details of a single order
- **Socket Integration** – Listens to real-time events from backend

### 2. Backend (Node.js + Express)
- **/orders GET** – Fetch all orders
- **/orders/:id PATCH** – Update order status
- **WebSocket Server** – Broadcasts status updates to all connected clients

### 3. Database (MongoDB)
- Orders stored with fields: `_id`, `customerId`, `products[]`, `status`, `createdAt`, `updatedAt`

---

## 🔄 Data Flow

1. **Initial Load:**
   - Frontend sends `GET /orders`
   - Backend queries MongoDB and returns JSON list of orders
   - UI displays the orders in a table

2. **Real-time Status Update:**
   - Status update (manual or auto) triggers server emit:  
     `socket.emit('orderStatusUpdated', { id, status })`
   - Client listens via `socket.on(...)` and updates local state

3. **Client Search:**
   - Search filters orders by `customerId` (case-insensitive)

---

## 🧪 Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| Frontend     | React, TailwindCSS, shadcn/ui|
| State Mgmt   | useState, useEffect          |
| Backend      | Node.js, Express             |
| Database     | MongoDB                      |
| Real-time    | Socket.IO                    |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 🧩 Order Status Pipeline

- PENDING → PAID → FULFILLED → CANCELLED
- Transitions enforced on backend and reflected live on frontend

---

## 📂 Folder Structure


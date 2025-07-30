# 🛒 Order Management System (OMS)

A scalable, real-time Order Management System built with **Next.js**, **Fastify (Node.js)**, and **MongoDB**. It supports full CRUD operations for orders, products, and customers, enforces a strict order-status pipeline, and provides real-time updates via WebSockets.

---

## 🚀 Features

- ✅ CRUD for Orders, Products, Customers
- 🔁 Status pipeline: `PENDING → PAID → FULFILLED → CANCELLED`
- 🌐 Real-time updates using Socket.IO
- 🔐 Role-based Access (Admin / Customer)
- 📤 Export orders to CSV
- 🔍 Search & Filter Dashboard
- ⚙️ Fastify-based API Server
- 🎯 MongoDB with ER modeling

---
## 🔐 Credentials

Use these credentials to log in as different roles:

### 👤 Customer
- **Email:** `unnatigandhi1999@gmail.com`  
- **Password:** `123456`

### 👩‍💼 Admin
- **Email:** `admin@gmail.com`  
- **Password:** `123456`

---
## 📁 Project Structure

├── apps/
│ └── client/ # Next.js frontend
│
├── packages/
│ ├── api/ # Fastify API server
│ ├── db/ # Database layer (Prisma/ORM config)
│ └── config/ # Shared config/env utils
│
├── docs/
│ └── high-level-design.md # 📄 System architecture & diagrams
│
├── .env.example # Sample environment variables
├── README.md # You are here


---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in the appropriate values:

```env
DATABASE_URL=MongoDB://user:password@host:5432/db
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret

🧪 Common Commands

| Command        | Location        | Description                        |
| -------------- | --------------- | ---------------------------------- |
| `pnpm install` | root            | Install all dependencies           |
| `pnpm dev`     | client/ or api/ | Run frontend or backend dev server |
| `pnpm lint`    | root            | Run ESLint                         |
| `pnpm format`  | root            | Format code with Prettier          |
| `pnpm build`   | client/api      | Build frontend or backend          |

📡 Deployment Steps
Local Setup
git clone https://github.com/your-username/oms-project
cd oms-project
pnpm install
cp .env.example .env
pnpm dev

Production Deployment

| Service     | Platform | Notes                    |
| ----------- | -------- | ------------------------ |
| Frontend    | Vercel   | Auto deploys from `main` |
| API Backend | Render   | Fastify server           |
| Database    | Supabase | Hosted MongoDB        |
| Realtime    | Same API | WebSocket with Socket.IO |

🔍 High-Level Design Document
📄 Click here to view the full system design

Includes:

✅ Architecture & request flows

✅ Component breakdown

✅ API contracts & sequence diagrams

✅ Deployment topology

✅ Security & observability

👥 Roles

| Role     | Capabilities                            |
| -------- | --------------------------------------- |
| Admin    | Full CRUD, CSV export, filter dashboard |
| Customer | View orders only                        |

📦 Tech Stack
Frontend: Next.js + TailwindCSS + Zustand/Context

Backend: Fastify + Node.js + Socket.IO

Database: MongoDB via Prisma or native driver

Deployment: Vercel (Frontend) + Render (Backend)

Auth: NextAuth + JWT

Logging/Monitoring: Pino, Sentry

🩺 Health Check
API server exposes /healthz endpoint for uptime monitoring.

📝 License
MIT © 2025 Your Name


---

### ✅ Tips

- Use VS Code preview or markdown viewer to check formatting.
- Include badges if your repo is public (e.g., CI status, license, etc.)
- Ensure the relative link to `docs/high-level-design.md` works from the root.

Let me know if you want this in a GitHub-compatible Markdown file or if you'd like me to auto-generate the file for download.

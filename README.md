# ✅ Task Management System

A complete **Task Management System** built using modern full-stack technologies.
This project allows users to register, login, and manage their personal tasks with secure authentication and a clean user interface.

This project was developed as a **Software Engineering Assessment** to demonstrate backend APIs, authentication, and frontend integration.

---

## 🔥 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication (Access Token + Refresh Token)
- Logout functionality
- Password hashing using bcrypt
- Secure refresh token stored in HTTP-only cookies

### ✅ Task Management
Each logged-in user can:
- Create a task
- View all tasks
- Edit task title and description
- Delete tasks
- Toggle task status (PENDING / COMPLETED)
- Pagination (Backend ready)
- Filtering by status (Backend ready)
- Search by title (Backend ready)

### 🖥 Frontend
- Next.js App Router UI
- Login & Register system
- Task dashboard
- Edit tasks inline
- Logout button
- Axios with automatic token refresh
- Clean & simple UI
- Fully responsive

---

## 🏗️ Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL / MySQL (SQL Database)
- JWT Authentication
- bcrypt for password hashing
- Zod for input validation

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hooks + Context API

---

## 📁 Project Structure

```

task-manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   ├── prisma/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── middleware.ts
│   └── package.json
│
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your_repo_url>
cd task-manager
````

---

## 🚀 Backend Setup

Go to backend folder:

```bash
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL=<your_database_url>
JWT_ACCESS_SECRET=accesssecret123
JWT_REFRESH_SECRET=refreshsecret123
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=5000
```

Run Prisma:

```bash
npx prisma migrate dev
npx prisma generate
```

Start backend:

```bash
npm run dev
```

---

## 🌐 Frontend Setup

Go to frontend folder:

```bash
cd ../frontend
npm install
npm run dev
```

Open browser:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers.
2. Password is encrypted and stored.
3. User logs in.
4. Access token is stored in localStorage.
5. Refresh token is stored in HTTP-only cookie.
6. Every request sends the access token.
7. If token expires → automatic refresh happens.

---

## 🔁 API Endpoints

### Auth

| Endpoint       | Method | Description          |
| -------------- | ------ | -------------------- |
| /auth/register | POST   | Register new user    |
| /auth/login    | POST   | Login                |
| /auth/refresh  | POST   | Refresh access token |
| /auth/logout   | POST   | Logout user          |

### Tasks

| Endpoint          | Method | Description     |
| ----------------- | ------ | --------------- |
| /tasks            | GET    | Get tasks       |
| /tasks            | POST   | Create task     |
| /tasks/:id        | GET    | Get single task |
| /tasks/:id        | PATCH  | Edit task       |
| /tasks/:id        | DELETE | Delete task     |
| /tasks/:id/toggle | PATCH  | Toggle status   |

---

## ✅ Authentication Security

* Access Token → Short lived
* Refresh Token → Long lived (stored securely in cookies)
* Password hashing using bcrypt
* Protected routes using middleware
* Token verification on backend

---

## 🧪 Testing

Use Postman or browser to test:

```
POST /auth/register
POST /auth/login
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
```

---

## 📌 Future Improvements

* Email verification
* Role based access
* Pagination UI
* Analytics dashboard
* Mobile app version
* Task categories
* Due date reminders

---

## 👨‍💻 Created By

**Aniket Singh**
B.Tech Computer Science & Engineering
IIIT Nagpur (2021–2025)
LeetCode 🧩 300+ problems
Frontend & Full Stack Developer


---

## 🏁 Conclusion

This is a complete full-stack project showing:
✅ Authentication
✅ Authorization
✅ Database design
✅ REST APIs
✅ Frontend integration
✅ Clean architecture




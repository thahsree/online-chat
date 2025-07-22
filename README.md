# 💬 MERN Stack Chat App

A full-stack real-time chat application using **MongoDB**, **Express**, **React**, **Node.js**, and **Socket.IO**, with cloud image uploads.

---

## 📚 Table of Contents

* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Backend Dependencies](#-backend-dependencies)
* [Frontend Dependencies](#-frontend-dependencies)
* [Environment Variables](#-environment-variables)
* [API Endpoints](#-api-endpoints)
* [Getting Started](#-getting-started)
* [Deployment Guide](#-deployment-guide)

---

## ✨ Features

* 🔐 User registration & JWT authentication
* 💬 Real-time messaging (1-1 / group) with Socket.IO
* 📄 Profile image uploads with Cloudinary
* ⚡ Optimized performance with React Query + Vite
* 🧪 Type-safe components with TypeScript
* 💬 Responsive & animated UI using Chakra UI, Tailwind CSS, and Framer Motion

---

## 🛠️ Tech Stack

### Frontend

* React 18, Vite, TypeScript
* Chakra UI + Tailwind CSS
* React Router v7
* React Query (`@tanstack/react-query`)
* Socket.IO Client
* Cloudinary (uploads)

### Backend

* Node.js, Express.js
* MongoDB + Mongoose
* JWT Auth + Bcrypt
* Multer + Cloudinary storage
* Socket.IO Server

---

## 📁 Project Structure

```bash
/
├── client/                 # Frontend (Vite + React + TS)
│   └── ...
├── backend/                 # Backend (Express + MongoDB)
│   └── ...
└── README.md
```

---

## 📦 Backend Dependencies

See in `server/package.json`

```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "cloudinary": "^1.41.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.12.0",
  "multer": "^2.0.1",
  "multer-storage-cloudinary": "^4.0.0",
  "nodemon": "^3.1.9",
  "socket.io": "^4.8.1"
}
```

---

## 🎨 Frontend Dependencies

See in `client/package.json`

```json
"dependencies": {
  "@chakra-ui/react": "^3.3.1",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@tanstack/react-query": "^5.66.7",
  "axios": "^1.7.9",
  "framer-motion": "^11.18.2",
  "motion": "^12.0.6",
  "next-themes": "^0.4.4",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.4.0",
  "react-loading-skeleton": "^3.5.0",
  "react-router-dom": "^7.1.1",
  "socket.io-client": "^4.8.1"
}
```

---

## 🦪 Sample `.env` File

Create `.env` in the **backend root directory** (`backend/`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatapp
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Create `.env` in the **frontend root directory** (`client/`):

```env
VITE_BASE_URL=https:/yourbackendURL/api
VITE_SOCKET_URL=https://yourBackendURL

---

## 🌐 API Endpoints (Backend)

### Auth Routes

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/users/register` | Register a new user    |
| POST   | `/api/users/login`    | Login and return token |
| GET    | `/api/users/`   | Get all users (with search) |

### Chat Routes

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET   | `/api/chats/`      | GET all chats |
| POST    | `/api/chats/`      | create / access user chats  |
| GET   | `/api/group` | Get all group chats |
| PUT    | `/api/addToGroup/`   | Add to group |
| PUT    | `/api/groupRename/`   | Rename group |
| DELETE    | `/api/removeFromGroup/`   | remove from group |

### Message Routes

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET   | `/api/messages/:chatId`        | fetch messages  |
| POST    | `/api/messages` | Send one on one messages, other chat details are send through req.body |
| POST    | `/api/messages/groupChat` | Send group messages, other chat details are send through req.body  |

---

## ▶️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-chat-app.git
cd mern-chat-app
```

### 2. Install Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Install Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## ☁️ Deployment Guide

### 🔧 Backend (Render)

1. Go to [https://render.com](https://render.com)
2. Create a new web service and connect your GitHub repo
3. Set Build Command: `npm install`
4. Set Start Command: `npm run dev`
5. Add environment variables from `.env`
6. Make sure port is `5000` or `PORT` from `.env`

### 🌐 Frontend (Vercel)

1. Go to [https://vercel.com](https://vercel.com)
2. Import the frontend project (`client/` folder)
3. Add environment variable for backend URL
4. Set framework as **Vite**
5. Deploy

---

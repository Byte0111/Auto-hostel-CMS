# 🏠 HostelDesk — Complaint Management System

A full-stack hostel complaint management system built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 📁 Project Structure

```
hostel-complaint-system/
├── backend/
│   ├── config/db.js            # MySQL database connection
│   ├── controllers/           # Route handlers
│   │   ├── authController.js
│   │   └── complaintsController.js
│   ├── middleware/            # Auth middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── config/
│   ├── setup.sql              # Database schema & seed data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── ChatBot.jsx   # AI Chat Assistant (Ollama-powered)
│   │   │   ├── ComplaintCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── contexts/         # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/        # API service
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- MySQL (running locally on port 3306)

### Setup

1. **Start MySQL** and create the database:
```bash
# The schema is auto-created when you run the backend
```

2. **Start the Backend**:
```bash
cd backend
npm install
npm run dev
```

3. **Start the Frontend** (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```

4. Open `http://localhost:5173`

---

## 🔐 Demo Credentials

| Role | Registration No | Password |
|------|----------------|----------|
| Admin | admin1 | pass123 |
| Student | 21BCE0001 | pass123 |
| Student | 202300182 | pass123 |

---

## ✨ Features

### Student Portal
- 🔐 **Login / Register** — Create accounts with room assignment
- 📊 **Dashboard** — Stats overview + recent complaints
- ➕ **Submit Complaint** — Category picker, priority selector, description
- 💬 **AI Assistant** — Chat bot powered by Ollama (LLM)
- 📋 **My Complaints** — Filter by status, view details

### Admin Panel
- 📊 **Dashboard** — Full stats, pending complaints queue
- 📋 **All Complaints** — Filter by status/category, update status
- 👥 **Students** — View all registered students with complaint counts

---

## 🤖 AI Chat Bot

The app includes an **AI-powered chat assistant** that helps users:
- How to file complaints
- Check complaint status
- Understand categories and priority levels
- General hostel information

### Setup Ollama (Optional)
For the AI chat to work with a real LLM:
1. Install [Ollama](https://ollama.com)
2. Run `ollama serve`
3. Run `ollama pull llama3.2`

If Ollama isn't running, the bot uses a simple rule-based fallback.

---

## 🗂️ Complaint Categories

- Electrical
- Plumbing
- Furniture
- Cleaning
- Other

## 📊 Complaint Statuses

- `Pending` → `In Progress` → `Resolved`

---

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MySQL + mysql2
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (icons)

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get current user

### Complaints
- `GET /api/complaints` — Get all complaints (admin) or user's complaints
- `POST /api/complaints` — Create complaint
- `PUT /api/complaints/:id` — Update complaint status (admin)
- `DELETE /api/complaints/:id` — Delete complaint
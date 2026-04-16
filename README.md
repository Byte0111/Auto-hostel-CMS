# 🏠 HostelDesk — Complaint Management System

A professional, fully functional Hostel Complaint Management System built with vanilla HTML, CSS, and JavaScript. No frameworks or backend required — all data is stored in `localStorage`.

---

## 📁 Project Structure

```
hostel-complaint-system/
├── index.html                   ← Login page (entry point)
├── css/
│   ├── main.css                 ← Design tokens, reset, global styles, utilities
│   ├── auth.css                 ← Login / register page styles
│   └── dashboard.css            ← Dashboard layout, sidebar, cards, tables
├── js/
│   ├── data.js                  ← Data layer: localStorage CRUD, seed data, constants
│   ├── app.js                   ← Router, Toast system, Modal system, shared helpers
│   ├── auth.js                  ← Login & registration logic
│   ├── student.js               ← Student dashboard logic
│   └── admin.js                 ← Admin dashboard logic
└── pages/
    ├── student-dashboard.html   ← Student portal UI
    └── admin-dashboard.html     ← Admin panel UI
```

---

## 🚀 How to Run

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. The app opens at `http://127.0.0.1:5500`

### Option 2: Python HTTP Server
```bash
cd hostel-complaint-system
python3 -m http.server 8080
# Then open http://localhost:8080
```

### Option 3: Node.js HTTP Server
```bash
npm install -g http-server
cd hostel-complaint-system
http-server -p 8080
# Then open http://localhost:8080
```

> ⚠️ **Do not** open `index.html` directly as a `file://` URL — relative paths won't resolve correctly.

---

## 🔐 Demo Credentials

| Role      | Email                 | Password     |
|-----------|-----------------------|--------------|
| Admin     | admin@hostel.com      | admin123     |
| Student 1 | arjun@student.com     | student123   |
| Student 2 | priya@student.com     | student123   |
| Student 3 | rahul@student.com     | student123   |

---

## ✨ Features

### Student Portal
- 🔐 **Login / Register** — Create new accounts with room assignment
- 📊 **Dashboard** — Stats overview + recent complaints
- ➕ **Submit Complaint** — Category picker, priority selector, description with char counter
- 📋 **My Complaints** — Filter by status, search, click to view detail with timeline
- 👤 **Profile** — View info, change password

### Admin Panel
- 📊 **Dashboard** — Full stats, pending complaints queue, category breakdown bar chart
- 📋 **All Complaints** — Filter by status/category/search/sort, update status + remarks
- 👥 **Students** — Table of all registered students with complaint counts
- 📈 **Analytics** — Progress bars for category, status, priority + recent activity
- ⚙️ **Settings** — Edit profile, change password, export data (JSON), clear data

### General
- 🎨 Refined dark-green + warm cream design system
- 🔔 Toast notifications system
- 💬 Modal dialogs for detail views and confirmations
- 📱 Responsive layout (mobile sidebar toggle)
- 🔄 Activity timeline on every complaint
- 🌱 Pre-seeded with realistic sample data

---

## 🗂️ Complaint Categories

| Category   | Icon |
|------------|------|
| Plumbing   | 🔧   |
| Electrical | ⚡   |
| Carpentry  | 🪵   |
| WiFi       | 📶   |
| Cleaning   | 🧹   |
| Security   | 🔒   |
| Other      | 📋   |

## 📊 Complaint Statuses

`Pending` → `Open` → `In Progress` → `Resolved` / `Rejected`

---

## 🛠️ Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** — Modules pattern, localStorage, DOM manipulation
- **Google Fonts** — Lora (display) + DM Sans (body)
- **No frameworks, no build tools, no dependencies**

---

## 📝 Extending the Project

To connect a real backend:
- Replace `DB.*` methods in `data.js` with `fetch()` calls to your API
- Replace `localStorage` session with JWT / cookies
- All UI logic in `student.js` and `admin.js` remains the same

# Student Management System (MERN Stack)

A CRUD application to manage student records.
**Stack:** MongoDB, Express.js, React.js (Vite), Node.js, Axios

## Features
- Add, View, Edit, Delete students
- Search by name, email or course (live search)
- Client-side validation (React) + server-side validation (Mongoose)
- Duplicate email detection, friendly error messages

## Folder Structure
```
student-management-system/
├── backend/
│   ├── controllers/studentController.js   # CRUD logic
│   ├── models/Student.js                  # Mongoose schema
│   ├── routes/studentRoutes.js            # API routes
│   ├── server.js                          # Express app + DB connection
│   └── .env.example
└── frontend/
    └── src/
        ├── components/ (StudentForm, StudentTable, SearchBar)
        ├── api.js                         # Axios calls
        ├── App.jsx                        # State + page layout
        └── App.css
```

## Setup

### Prerequisites
Node.js 18+, and MongoDB running locally (or a MongoDB Atlas connection string).

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # edit MONGO_URI if needed
npm run dev              # http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.example .env     # optional
npm run dev              # http://localhost:5173
```

## REST API
| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | /api/students               | List all students                    |
| GET    | /api/students?search=term   | Search by name / email / course      |
| POST   | /api/students               | Add a student                        |
| PUT    | /api/students/:id           | Update a student                     |
| DELETE | /api/students/:id           | Delete a student                     |

Student fields: `name`, `email` (unique), `age` (5-100), `course`, `phone` (10 digits).

## Testing Checklist
- [ ] Add a valid student -> appears in list
- [ ] Submit empty/invalid form -> validation errors shown
- [ ] Add duplicate email -> error toast
- [ ] Edit a student -> changes saved
- [ ] Delete a student -> removed after confirmation
- [ ] Search matches name, email and course; clearing search shows all

## Deployment (optional)
- Database: MongoDB Atlas
- Backend: Render / Railway (set `MONGO_URI`, `PORT`)
- Frontend: Vercel / Netlify (set `VITE_API_URL` to the deployed backend URL + `/api/students`)

## Git Workflow
```bash
git init
git add .
git commit -m "Initial commit: Student Management System"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

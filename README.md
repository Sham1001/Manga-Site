# Manga Wave 📚
A full-stack manga reading platform built with a dedicated user-facing application, an admin dashboard for content management, and a scalable backend API. The platform allows users to browse and read manga while enabling administrators to efficiently manage manga collections and chapters.

## 🌐 Live Demo

### User Application

🔗 **Live Site:** https://manga-site-frontend.vercel.app

### Admin Panel

🔗 **Admin Dashboard:** https://manga-wave-adminpanel.vercel.app

### Backend API

🔗 **API Endpoint:** https://manga-site-backend.onrender.com

**Note:** The admin dashboard is accessible only to authorized administrators.


## Features

### User Features

* Google OAuth Authentication
* User registration and login
* Update user profile
* Add manga to favorites
* Browse manga catalog
* Read manga chapters online
* Search manga by title
* Responsive design for mobile and desktop
* Paginated manga listings
* Optimized content loading

### Admin Panel Features

* Secure Admin Login
* Add new manga
* Edit manga details
* Delete manga
* Add chapters to manga
* Edit chapter information
* Manage manga library
* View all uploaded manga and chapters
* Pagination for manga and chapter management
* Dashboard-based content administration

### Backend Features

* RESTful API architecture
* JWT-based authentication
* MongoDB database integration
* Secure route protection
* Data validation and error handling
* Optimized database queries

---

## 🛠️ Tech Stack

### Frontend (User Side)

* React.js
* Tailwind CSS
* JavaScript

### Admin Panel

* React.js
* Tailwind CSS
* Admin Dashboard UI

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Google OAuth
* JWT Authentication

### Deployment

* Frontend (User + Admin Panel): Vercel
* Backend API: Render

---

## 📂 Project Structure

```bash
project-root/
│
├── M-frontend/          # User-facing application
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── adminPanel/          # Admin dashboard
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/             # Express API server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── config/
│
└── README.md
```

---

## 🔥 Core Functionalities

### Manga Management

* Create and manage manga collections
* Upload and organize chapters
* Update manga information
* Manage chapter releases

### User Experience

* Seamless Google Sign-In
* Favorite manga tracking
* Fast chapter navigation
* Responsive reading interface
* Personalized profile management

### Performance Optimization

* Server-side pagination
* Efficient database querying
* Optimized API responses
* Lazy-loaded content where applicable

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/mangaverse.git
```

### Install Dependencies

For User Frontend:

```bash
cd M-frontend
npm install
```

For Admin Panel:

```bash
cd adminPanel
npm install
```

For Backend:

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Run Application

Backend:

```bash
npm run server
```

Frontend:

```bash
npm run dev
```

Admin Panel:

```bash
npm run dev
```

---

## 🌐 Deployment

### Frontend Deployment

* User Application deployed on Vercel
* Admin Dashboard deployed on Vercel

### Backend Deployment

* Express API deployed on Render

---

## 🔒 Security

* Google OAuth Authentication
* JWT Authorization
* Protected Admin Routes
* Secure API Endpoints
* Input Validation & Sanitization

---

## 📈 Future Enhancements

* Reading history tracking
* Manga ratings and reviews
* Bookmark chapters
* Notification system for new chapter releases
* Advanced search and filtering
* Recommendation system
* Analytics dashboard for admins

---

## 👨‍💻 Author

Developed and maintained by **Shamsad Salmani**



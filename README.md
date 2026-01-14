# GigFlow – Mini Freelance Marketplace Platform

GigFlow is a mini freelance marketplace platform where users can post jobs (Gigs) and freelancers can apply by submitting bids. The platform supports a complete hiring workflow with secure authentication and proper state management.

This project was built as part of the **Full Stack Development Internship Assignment**.

---

## 🚀 Features

- Secure user authentication using JWT with HttpOnly cookies
- Fluid roles: any user can post gigs (Client) or bid on gigs (Freelancer)
- Create and browse open gigs
- Search gigs by title
- Freelancers can submit bids with a price and message
- Clients can view all bids on their gigs
- Complete hiring workflow:
  - Gig status changes from **open** to **assigned**
  - Selected bid becomes **hired**
  - All other bids are automatically **rejected**
- Freelancer dashboard to track bid status (pending / hired / rejected)
- Redis-based locking to prevent race conditions during hiring (Bonus)

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication (HttpOnly cookies)
- Redis (for transactional integrity)

---

## Demo video :- 
https://drive.google.com/file/d/1F7HlMO6M9KEsEbLiIVATIcBahvOaPPcH/view?usp=sharing

---

## ⚙️ Environment Variables

Create a `.env` file in both **backend** and **frontend** directories using the provided `.env.example` files.

### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_url
CLIENT_URL=http://localhost:5173

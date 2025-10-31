
🌍 Travel Booking App


A full-stack Travel Experience Booking Platform that allows users to explore destinations, view experience details, and complete bookings through a seamless and interactive UI.

This project is built using the MERN Stack (MongoDB, Express.js, React, Node.js) and hosted live for review.
🚀 Live Demo
https://travel-booking-app-beta.vercel.app/
🧭 Features
•	Browse curated travel experiences
•	Search experiences by location or keyword
•	View detailed experience descriptions
•	Secure booking flow — from browse → checkout → confirmation
•	Responsive, modern UI built with React + TailwindCSS
•	Hosted on Render (backend) and Vercel (frontend)
•	Uses royalty-free images from Unsplash / Pexels
🛠️ Tech Stack
Frontend: React.js, React Router DOM, Axios, TailwindCSS
Backend: Node.js, Express.js, MongoDB (Mongoose), CORS, dotenv
Deployment: Frontend → Vercel, Backend → Render, Database → MongoDB Atlas
⚙️ Setup Instructions
1️⃣ Clone the repository:

git clone https://github.com/niru128/travel-booking-app.git
cd travel-booking-app
2️⃣ Install dependencies:

For backend:
cd backend
npm install

For frontend:
cd ../frontend
npm install
3️⃣ Environment Variables:
Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
AUTH_SECRET=your_jwt_secret
4️⃣ Run locally:

Start backend:
cd backend
npm start

Start frontend:
cd ../frontend
npm run dev
🌐 Deployment
Backend (Render):
1. Push your backend folder to GitHub
2. Create a new Render Web Service
3. Build command → npm install
4. Start command → node server.js
5. Add environment variables
6. Deploy 🚀
Frontend (Vercel):
1. Push your frontend folder to GitHub
2. Import project in Vercel
3. Add environment variable: VITE_API_URL=https://travel-booking-app-79zg.onrender.com/api
4. Deploy 🚀
   
📁 Folder Structure

travel-booking-app/
│
├── backend/
|__ src
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md

🧩 API Endpoints
Method	Endpoint	Description
GET	/api/experiences	Fetch all experiences
GET	/api/experiences/:id	Fetch single experience details
POST	/api/checkout/:id	Create booking
GET	/api/booking-confirmed	Confirm booking
🖼️ Data & Assets
All experience data and images used are freely available from Unsplash (https://unsplash.com) and Pexels (https://pexels.com).
💡 Future Enhancements
•	Add user authentication (JWT-based)
•	Integrate payment gateway (Stripe/Razorpay)
•	Add booking history and profile management
•	Admin dashboard for managing experiences

📬 Contact
Developer: Niranjan C B
Email: nirubasavaraj2002@gmail.com
GitHub: https://github.com/niru128

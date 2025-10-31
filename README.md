# BookIt: Experiences & Slots - Fullstack Booking Application

## Overview
BookIt is a fullstack web application designed for booking travel experiences. Users can browse available experiences, view details and slots, and complete bookings through a seamless, responsive interface. The project demonstrates practical fullstack workflows, API integration, and clean UI design matching the provided Figma prototype.

---

## Features

### Frontend
- Developed with **React + JavaScript** (Vite recommended)
- Styled exclusively with **TailwindCSS**
- Pages:
  - **Home Page:** List experiences, fetch data dynamically
  - **Details Page:** Show experience details with available dates and slots
  - **Checkout Page:** Collect user info, apply promo codes, display pricing
  - **Result Page:** Show confirmation or failure messages
- Fully responsive, mobile-friendly UI
- User-friendly feedback (loading states, success, failure)
- Minimal form validation (email, name, etc.)
- Consistent spacing, typography, and color schemes based on Figma design

### Backend
- Built with **Node.js + Express**
- Data stored in **MongoDB** (or PostgreSQL/MySQL if preferred)
- API Endpoints:
  - `GET /experiences` — List all experiences
  - `GET /experiences/:id` — Experience details, slots
  - `POST /bookings` — Store bookings
  - `POST /promo/validate` — Promo code validation
- Data validation and protection against double-booking
- Validation flow for booking and promo codes

### Integration
- Fetch experiences, experience details, and booking data using Axios
- Dynamic data handling, clean state management with React hooks
- Hosted on cloud platforms like **Vercel** or **Render**
- Live demo and GitHub repository link provided

---

## Setup & Installation

### Frontend
1. Clone the repository:
git clone https://github.com/niru128/Travel-Booking-App

text
2. Navigate into project directory:
cd Bookit-frontend

text
3. Install dependencies:
npm install

text
4. Run locally:
npm run dev

text

### Backend
1. Clone the backend repo or integrate it within the project
2. Install dependencies:
npm install

text
3. Configure environment variables (`.env`) for database URI and other keys
4. Start server:
npm start

text

---

## Hosting & Deployment
- Deploy backend on **Render** and frontend on **Vercel**

---

## Design & UI
- Match the Figma design exactly, utilizing TailwindCSS for typography, spacing, and colors
- Responsive across all devices
- Clear component states, loading indicators, and feedback messages

---

## Data & Content
- Use placeholder experience data or royalty-free images from Unsplash/Pexels
- Ensure promo codes like SAVE10, FLAT100 are supported and validated on backend

---

## Final Notes
- Include setup instructions, hosted links, and repository URL in the final submission
- Secure environment variables (API keys, database connection strings)
- Prevent double booking by slot validation on backend
- Provide clear user feedback on booking success or failure

---

## License
This project is for educational/testing purposes and can be adapted or extended.

---

## References:
- Figma Design: https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=0
- Inspired by common fullstack booking app patterns

---

## Contact
For further questions or feature requests, contact
Niranjan C B
nirubasavaraj2002@gmail.com

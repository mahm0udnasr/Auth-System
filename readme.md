# Authentication System

A full-stack authentication system built using the MERN stack (MongoDB, Express.js, React, Node.js) with modern security features and a beautiful user interface.

## Features

- User registration and login
- JWT-based authentication
- Password encryption using bcrypt
- Email verification
- Modern responsive UI using Tailwind CSS
- Toast notifications for better UX

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email functionality
- CORS for cross-origin resource sharing
- Cookie Parser for handling cookies
- Environment variables management with dotenv

### Frontend
- React
- React Router DOM
- Axios for API requests
- Tailwind CSS for styling
- React Toastify for notifications
- Vite as build tool
- ESLint for code quality

## Installation

1. Clone the repository
```bash
git clone https://github.com/mahm0udnasr/Auth-System.git
cd Auth-System
```

2. Install Server Dependencies
```bash
cd server
npm install
```

3. Install Client Dependencies
```bash
cd ../client
npm install
```

4. Set up Environment Variables
   
Create `.env` file in server directory with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Create `.env` file in client directory with:
```
VITE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the Server
```bash
cd server
npm run start:dev
```

2. Start the Client
```bash
cd client
npm run start:dev
```

The server will run on http://localhost:3005 and the client on http://localhost:5173

## Project Structure

### Server Structure
```
server/
├── config/         # Configuration files
├── controller/     # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
└── server.js       # Entry point
```

### Client Structure
```
client/
├── public/         # Static files
├── src/
│   ├── components/ # React components
│   ├── pages/      # Page components
│   ├── context/    # React context
│   ├── hooks/      # Custom hooks
│   ├── utils/      # Utility functions
│   └── App.jsx     # Main component
└── index.html
```

## Author

**Mahmoud Nasr**
- Fullstack Web Developer
- Project: Authentication System using MERN Stack

## License

This project is licensed under the ISC License.
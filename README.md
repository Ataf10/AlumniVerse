# 🎓 AlumniVerse

AlumniVerse is a MERN-stack based social media platform designed to connect college students and alumni in a seamless and interactive way. It allows current students to engage with alumni, share updates, and build valuable professional relationships within their college network.

---

## 🚀 Features

### 🔐 Authentication
- Student login using **phone number**
- Admin approval required for new users
- Google login support (OAuth)

### 📝 Posts & Feed
- Students and alumni can create and view posts
- Real-time updates on feed
- Post likes, comments, and share features

### 💬 Messaging
- One-on-one real-time chat with Socket.IO
- Chat history saved with timestamps

### 🧑‍💼 Admin Dashboard
- View and manage all users and posts
- Approve or reject new registrations
- Display all current admins in a dedicated section

### 👤 Profile Management
- View and edit personal profile
- Upload or remove profile pictures via Cloudinary

---

## 🛠 Tech Stack

| Frontend       | Backend          | Database   | Other Tools     |
|----------------|------------------|------------|------------------|
| React.js       | Express.js       | MongoDB    | Tailwind CSS     |
| Vite           | Node.js          | Mongoose   | Socket.IO        |
| Framer Motion  | Passport.js      |            | Cloudinary       |

---

## 🗂 Folder Structure

/client
├── src
│ ├── components
│ ├── pages
│ ├── context
│ └── App.jsx
/server
├── controllers
├── models
├── routes
├── middleware
└── index.js

yaml
Copy
Edit

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/alumniverse.git
cd alumniverse
2. Install dependencies
Client:

bash
Copy
Edit
cd client
npm install
Server:

bash
Copy
Edit
cd ../server
npm install
3. Set up environment variables
Create a .env file in the server directory with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
4. Run the application
Client:

bash
Copy
Edit
npm run dev
Server:

bash
Copy
Edit
npm start
🧪 Future Enhancements
Group chat functionality

Alumni tagging and mentorship request

Event creation and RSVP

Notification system

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add feature')

Push to the branch (git push origin feature-name)

Open a pull request

📬 Contact
Have questions or suggestions?
Email us at: alumniverse@college.edu

📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Would you like me to generate this as a downloadable file or integrate badges (e.g., build, licen

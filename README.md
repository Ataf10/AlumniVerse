# 🎓 AlumniVerse

**AlumniVerse** is a MERN-stack based social media platform designed to connect college students and alumni. It provides a space for sharing updates, networking, chatting, and building professional relationships within the college community.

---

## 🚀 Features

### 🔐 Authentication
- Student login using **phone number**
- New users require **admin approval**
- Google OAuth login supported

### 📝 Posts & Feed
- Public feed with posts from all users
- Users can create, delete, and interact with posts
- Comments and share functionality

### 💬 Chat
- **One-on-one real-time messaging** using Socket.IO
- Chat history with timestamps

### 🧑‍💼 Admin Dashboard
- Approve or reject new users
- View and manage all users and posts
- Display list of current admins

### 👤 Profile Management
- View and update personal profiles
- Upload/remove profile picture (Cloudinary support)

---

## 🛠 Tech Stack

**Frontend**: React, Vite, Tailwind CSS, Framer Motion  
**Backend**: Node.js, Express.js, MongoDB, Mongoose  
**Real-Time**: Socket.IO  
**Authentication**: Passport.js, Google OAuth  
**Media**: Cloudinary

---

## 📁 Folder Structure

/client
└── src
├── components
├── pages
├── context
└── App.jsx

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

## ⚙️ Setup & Installation

### 1. Clone the repository

```
git clone https://github.com/your-username/alumniverse.git
cd alumniverse
```
2. Install dependencies
Client:

```
Copy
Edit
cd client
pnpm install

```
Server:

```
Copy
Edit
cd ../server
pnpm install
```
3. Create .env in /server
```env
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
```
4. Run the application
Client:

```
Copy
Edit
pnpm run dev
```
Server:

```
Copy
Edit
pnpm run nodemon

```
📈 Future Features
Group chats

Event announcements and RSVPs

Notifications & email updates

Alumni tagging and mentorship system

🤝 Contributing
Fork this repo

Create a branch: git checkout -b feature-name

Commit your changes: git commit -m 'Add feature'

Push to the branch: git push origin feature-name

Submit a pull request

📬 Contact
For suggestions or feedback:
📧 alumniverse@college.edu


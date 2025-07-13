 🎧 Levi Music Player – Frontend

A sleek and responsive music streaming frontend built with React and Vite. Levi Music Player supports features like liking songs, saving to playlists, joining real-time music rooms, and admin control for content and user management.

---

## 🚀 Features

- ✅ **User Features**
  - 🎵 Stream music with a clean UI
  - ❤️ Like/unlike tracks
  - 💾 Save songs to your library
  - 📁 Create and manage playlists
  - 💬 Join real-time rooms with others
  - 🧠 Activity display of users in rooms

- 🛠️ **Admin Features**
  - 🧑‍💼 Admin dashboard (accessible for admin users)
  - ❌ Remove songs/playlists/users
  - 🚫 Block or moderate user actions

---

## 🛠 Tech Stack

- **Framework**: React + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Real-Time Communication**: Socket.IO (integrated with backend)
- **Authentication**: (Based on your backend – JWT/Clerk/etc.)

---

## 📦 Installation

### 1. Clone the Repository
git clone https://github.com/Nileshnimawat/Frontend_levi_music_player.git
cd Frontend_levi_music_player

2. Install Dependencies
npm install

3. Setup Environment Variables
Create a .env file in the root:

VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
(Adjust URLs to match your backend setup)

4. Start Development Server
npm run dev


📌 Notes
This repo is frontend only. Make sure your backend server (Node/Express/Socket.IO) is running for full functionality.

Admin access is conditional based on your backend’s role-based auth.

✨ Author
Built by Nilesh Nimawat

🖥️ License
MIT License – Feel free to fork, enhance, and contribute!

Let me know if you also want a backend version of this `README.md` or a 
3

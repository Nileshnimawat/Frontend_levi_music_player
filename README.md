
# 🎧 Levi Music Player – Frontend

This is the **frontend** of the **Levi Music Player**, a sleek and modern full-stack music streaming application. The app allows users to explore, like, and manage music, create playlists, join real-time listening rooms, and more.

Built with **React**, **Redux**, **TailwindCSS**, and **Socket.IO**, this UI provides a dynamic user experience similar to Spotify.

---
BACKEND REPO:
```bash
https://github.com/Nileshnimawat/Backend_Levi_Music_Player
```

## 🌟 Features

### 👤 User Experience
- Signup/Login flow
- Like/Unlike songs
- Create and manage playlists

### 🏠 Dashboard
- View trending songs
- Access personal and liked playlists
- See your recent activity

### 🎶 Music Controls
- Play/Pause/Skip
- SeekBar & volume slider
- Responsive UI optimized for web

### 🧑‍🤝‍🧑 Rooms (Real-Time)
- Create or join rooms to sync playback
- See who is currently listening
- Chat with room members (optional)
- Live playback sync (Socket.IO)

### 🧑‍💼 Admin Panel
- Control rooms and user activities
- Moderate content and manage data

### 🎨 UI/UX
- Color-dominant gradients (using `color-thief-browser`)
- Dark mode ready with **ShadCN** and **TailwindCSS**
- Responsive and elegant layout

---

## 🧱 Tech Stack

- **React** (Vite)
- **Redux Toolkit** for state management
- **Socket.IO Client** for real-time interaction
- **Tailwind CSS** + **ShadCN UI**
- **React Slick** for client carousel
- **Color Thief** for dynamic backgrounds

---

## 📁 Project Structure

```
Frontend_levi_music_player/
├── src/
│   ├── assets/             #images , logo 
│   ├── components/         # UI components
│   ├── Layouts/            # layouts  (Player, Sidebar, Rightbar, etc.)
│   ├── Auth/               #  (login - signup )
│   ├── pages/              # App pages (Home, Playlist, Room, Admin)
│   ├── hooks/              # Custom hooks (useSocket, usePlayer, etc.)
│   ├── utils/              # Helpers (formatting, gradients, etc.)
│   ├── store/              # Redux store and slices
│   ├── routes/              # all routes defined here 
│   ├── libs/              # Helpers 
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── jsconfig.app.json
├── jsconfig.json
├── postcss.config.js
├── index.html
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Frontend_levi_music_player.git
cd Frontend_levi_music_player
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Start the development server

```bash
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---



---

## 💡 Author

Developed by [Nilesh Nimawat](https://github.com/Nileshnimawat)

> Don't forget to run the backend alongside: [Levi Music Player – Backend](https://github.com/your-username/Backend_Levi_Music_Player)
ontribute!

Let me know if you also want a backend version of this `README.md` or a 
3

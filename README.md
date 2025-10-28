# 💞 Our Anniversary - Romantic Anniversary Web App

A beautiful, modern anniversary web application for **Annas Tasya Esti Aryus Jannah** & **Achmad Rizal Efendy** celebrating their love story.

## ✨ Features

### 🔐 PIN-Based Authentication
- **Annas**: PIN `29102022` (ddmmyyyy)
- **Achmad**: PIN `20221029` (yyyymmdd)

### 🎯 Core Features
- ⏳ **Live Countdown Timer** to next anniversary
- 🖼️ **Parallax Timeline Gallery** with your memories
- 💌 **Real-Time Notes Board** - share love notes
- ❤️ **Heart Ping** - send love with particle effects & confetti
- 💬 **Real-Time Chat** - stay connected
- 🎵 **Music Player** - 8 romantic songs ready to play
- 💚 **Mood Tracker** - share how you're feeling
- 📸 **Photo Upload** - upload memories (Firebase Storage)
- 🌓 **Dark/Light Theme** - beautiful for day and night
- 🎊 **Celebration Page** - special surprise when countdown ends!

---

## 🚀 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS 4**
- **Framer Motion** - Beautiful animations
- **Firebase** - Firestore & Storage
- **Zustand** - State management
- **React Howler** - Audio support
- **Canvas Confetti** - Celebration effects

---

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔧 Setup Firebase

1. Create `.env.local` file with your Firebase credentials
2. Enable **Firestore Database** in Firebase Console
3. Enable **Storage** in Firebase Console
4. Update Storage Rules (see below)

### Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 🎵 Music

Place MP3 files in `public/music/` directory. 8 songs are already configured!

---

## 📁 Project Structure

```
lv/
├── app/
│   ├── celebration/    # Special celebration page
│   ├── dashboard/      # Main dashboard
│   ├── layout.tsx
│   └── page.tsx        # Login page
├── components/          # All UI components
├── lib/                # Firebase & store config
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── utils/              # Helper functions
└── public/
    └── music/          # Music files
```

---

## 🎨 Features in Detail

### Celebration Page
When countdown ends, users are redirected to a beautiful celebration page featuring:
- Heartfelt love letter
- Romantic quotes
- Three sequential popups
- Confetti animations
- Personalized for Annas & Achmad

### Mood Tracker
Share your mood in real-time with your partner:
- ❤️ In Love
- 😊 Happy
- 😔 Sad
- 🌧️ Rainy
- ☀️ Sunny

### Music Player
- 8 romantic songs ready
- Play/pause control
- Volume control
- Next/previous track
- Auto-play support

---

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

---

## 💕 Love Story

This app celebrates the beautiful love story between:
- **Annas Tasya Esti Aryus Jannah** 💕
- **Achmad Rizal Efendy**

Every moment together is precious. This is for you both. 💑

---

## 📝 License

Made with ❤️ for a beautiful couple.

---

**Happy Anniversary! May your love story continue forever.** ✨

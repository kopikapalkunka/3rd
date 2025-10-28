# ⚡ Quick Deploy Guide

## 🚀 2-Minute Deploy

### 1️⃣ Push to GitHub

```bash
git add .
git commit -m "feat: Anniversary app for Annas & Achmad"
git push origin main
```

**Don't have a GitHub repo?**

```bash
# Create repo on GitHub first
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/anniversary-app.git
git branch -M main
git push -u origin main
```

---

### 2️⃣ Deploy to Vercel

**Option A: Website**
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Add environment variables
5. Deploy!

**Option B: CLI**
```bash
npx vercel --prod
```

---

### 3️⃣ Add Environment Variables

In Vercel dashboard, add these from your `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDTmfZcIqatQrBZWtZA_IML18zmeknLziI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lupe-ca39c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lupe-ca39c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lupe-ca39c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=836609634947
NEXT_PUBLIC_FIREBASE_APP_ID=1:836609634947:web:34900950d20e37268f61b6
```

---

## 🎯 That's it!

Your app will be live at: `https://your-app.vercel.app`

Share the link with your partner! 💕


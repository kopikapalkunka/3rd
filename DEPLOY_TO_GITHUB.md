# 🚀 Deploy to GitHub & Vercel

## Step 1: Push to GitHub

### If you don't have a GitHub repo yet:

1. **Create new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `anniversary-app` (or any name)
   - Make it **Private** (recommended for personal)
   - Don't initialize with README
   - Click **"Create repository"**

2. **In your terminal, run:**

```bash
# Stage all files
git add .

# Commit
git commit -m "feat: Complete anniversary web app with celebration page, mood tracker, photo upload, and music player"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/anniversary-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### If you already have a GitHub repo:

```bash
# Add files
git add .

# Commit
git commit -m "feat: Complete anniversary web app"

# Push
git push
```

---

## Step 2: Deploy to Vercel

### Option 1: Via Vercel Website

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub
3. **Click**: "Add New Project"
4. **Import** your `anniversary-app` repository
5. **Configure:**
   - Framework: Next.js (auto-detected)
   - Build Command: `pnpm build`
   - Output Directory: `.next`
6. **Add Environment Variables:**
   
   Click "Environment Variables" and add these:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```
   (Get values from your `.env.local` file)

7. **Click**: "Deploy"

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

---

## Step 3: Update Firebase Settings

After deploying, update Firebase to allow your Vercel domain:

1. **Go to**: https://console.firebase.google.com/project/lupe-ca39c/settings/general
2. **Add your domain** to authorized domains
3. **Add**: `your-app.vercel.app`

---

## 📝 Quick Commands

```bash
# Push to GitHub
git add .
git commit -m "feat: Complete anniversary web app"
git push

# Deploy to Vercel (via CLI)
vercel --prod
```

---

## ✅ After Deployment

Your app will be live at:
- Production: `https://your-app.vercel.app`
- You can share this URL with your partner!

---

## 🎉 Done!

Your romantic anniversary app is now live on the internet! 💕


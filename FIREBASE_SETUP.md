# 🔥 Firebase Setup Guide

## Step-by-Step Instructions

### Step 1: Create Firebase Project

1. **Go to**: https://console.firebase.google.com/
2. **Click**: "Add project" or use existing project
3. **Enter project name**: "love" (or any name you like)
4. **Continue** through the setup
5. **Disable Google Analytics** (optional, can enable later)
6. **Create project**

### Step 2: Register Your Web App

1. Click the **web icon** `</>` in the Firebase console
2. **App nickname**: Enter "love" (or any nickname)
3. **Uncheck**: "Also set up Firebase Hosting" (we're using Vercel)
4. Click **"Register app"**

### Step 3: Copy Your Firebase Config

You'll see a code snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "love-xxxxx.firebaseapp.com",
  projectId: "love-xxxxx",
  storageBucket: "love-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

Copy these values - you'll need them in the next step!

### Step 4: Enable Firestore Database

1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a **location** (closest to you)
5. Click **"Enable"**

⚠️ **Important**: Test mode allows anyone to read/write. Use this only for development!

### Step 5: Add Firebase Config to Your App

1. In your project root, create a file named `.env.local`
2. Copy the template below and paste your values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=love-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=love-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=love-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

3. Replace the example values with YOUR actual Firebase config values
4. Save the file

### Step 6: Install Firebase CLI (Optional)

For production Firestore rules, install Firebase CLI:

```bash
npm install -g firebase-tools
```

### Step 7: Set Firestore Rules (Production)

For production, update Firestore rules in Firebase Console:

1. Go to **Firestore Database** → **Rules**
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**For development**, you can skip this and use test mode.

### Step 8: Test Your Connection

Run your app:

```bash
pnpm dev
```

Open the console (F12) to check for any Firebase errors.

### Step 9: Firestore Collections

Your app will automatically create these collections:

- `notes` - For the notes board
- `messages` - For chat messages
- `heartPings` - For heart ping notifications
- `moods` - For mood tracking

These will be created automatically when you use the features!

---

## Troubleshooting

### "Firebase connection refused"
- Check your `.env.local` file
- Make sure all variables start with `NEXT_PUBLIC_`
- Restart the dev server after adding environment variables

### "Missing or insufficient permissions"
- Go to Firestore Rules and enable test mode
- Or set up proper security rules

### Environment variables not working
- Make sure file is named exactly `.env.local`
- Make sure it's in the root directory
- Restart the dev server

---

## Quick Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] Firebase config copied
- [ ] `.env.local` file created with config
- [ ] Firestore enabled
- [ ] Dev server restarted
- [ ] App tested and working

---

## Need Help?

If you encounter issues:
1. Double-check your `.env.local` file
2. Make sure Firestore is enabled
3. Check browser console for errors
4. Verify your Firebase project is active

Happy coding! 💕


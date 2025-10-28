# 🔥 Quick Firebase Setup

## Current Status

I can see you're in the Firebase Console! Here's what to do next:

### What You're Seeing

You're on **Step 1: Register app**
- App nickname: `love` ✅

### Next Steps (Do This Now):

1. **Click "Register app"** button (blue button at bottom)

2. **After clicking, you'll see Firebase config values.** It will look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "love-xxxxx.firebaseapp.com",
     projectId: "love-xxxxx",
     storageBucket: "love-xxxxx.appspot.com",
     messagingSenderId: "123456...",
     appId: "1:123456..."
   };
   ```

3. **Copy these 6 values** - You'll need them!

4. **Skip adding the SDK** for now - we already have it configured!

5. **Enable Firestore Database**:
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode"
   - Pick a location (choose closest to you)
   - Click "Enable"

---

## Step 2: Add Config to Your App

After you get the config from Firebase:

1. **Copy this template** to create `.env.local`:

```bash
# In your terminal, run this:
cp env.local.template .env.local
```

2. **Open `.env.local`** in your code editor

3. **Replace the placeholder values** with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=love-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=love-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=love-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
```

---

## Step 3: Restart Your App

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
pnpm dev
```

---

## Step 4: Test It!

1. Open your app
2. Login with a PIN
3. Try adding a note or chat message
4. Check browser console (F12) for any errors

If you see no errors in console, Firebase is working! 🎉

---

## Need Help?

**Problem: Can't find the config values?**
- Look for the `firebaseConfig` object in the Firebase Console
- It should appear right after registering the app

**Problem: "Failed to connect to Firestore"?**
- Make sure Firestore is enabled
- Check your `.env.local` file
- Make sure you restarted the dev server

**Problem: Config not loading?**
- Make sure all variables start with `NEXT_PUBLIC_`
- Check file is named exactly `.env.local`
- Restart the dev server

---

## 🎯 Quick Checklist

- [ ] Clicked "Register app" in Firebase Console ✅
- [ ] Copied all 6 config values
- [ ] Created `.env.local` file with values
- [ ] Enabled Firestore Database
- [ ] Restarted dev server
- [ ] App working without errors

---

## Next: Go back to Firebase Console

1. Click the **"Register app"** button
2. Copy the config values
3. Come back here and I'll help you add them!


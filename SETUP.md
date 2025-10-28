# 🚀 Setup Instructions

## Quick Start Guide

### 1. Install Dependencies (if not already done)
```bash
pnpm install
```

### 2. Set Up Environment Variables (Optional - for Firebase)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Getting Firebase Credentials:**
1. Go to https://console.firebase.google.com/
2. Create a new project (or use existing)
3. Click "Add app" → Web
4. Copy the config values
5. Enable Firestore Database
6. Update rules to allow read/write (for production, use proper security rules)

### 3. Customize Your App

#### Update PIN Codes
Edit `utils/pinAuth.ts`:
```typescript
// Female PINs (ddmmyyyy format)
const femalePins = ['29102022']; // Your anniversary date

// Male PINs (yyyymmdd format)
const malePins = ['20221029']; // Your anniversary date
```

#### Update Anniversary Date
Edit `utils/pinAuth.ts`:
```typescript
export function getAnniversaryDate() {
  // Change to your next anniversary date
  // Format: new Date(YEAR, MONTH-1, DAY)
  return new Date(2025, 9, 29); // October 29, 2025
}
```

#### Add Timeline Events
Edit `components/TimelineGallery.tsx`:
```typescript
const sampleTimeline: TimelineEvent[] = [
  {
    id: '1',
    title: 'First Meeting',
    date: '2022-10-29',
    description: 'The day our story began ✨',
  },
  {
    id: '2',
    title: 'First Kiss',
    date: '2022-11-15',
    description: 'A magical moment ✨',
  },
  // Add more events...
];
```

#### Add Photos to Timeline
Add images to `public/images/` and reference them in timeline events:
```typescript
{
  id: '1',
  title: 'First Meeting',
  date: '2022-10-29',
  description: 'The day our story began ✨',
  image: '/images/first-meeting.jpg', // Add image path
}
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the App

### Test PINS:
- **Female**: `29102022` (October 29, 2022)
- **Male**: `20221029` (October 29, 2022)

### Test Features:
1. ✅ Login with PIN
2. ✅ View countdown timer
3. ✅ Scroll through timeline
4. ✅ Add notes
5. ✅ Send heart pings
6. ✅ Chat messages
7. ✅ Music player toggle

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all Firebase variables from `.env.local`

### Manual Build

```bash
pnpm build
pnpm start
```

## Features Currently Working

✅ **Client-Side Only Features:**
- PIN authentication
- Countdown timer
- Timeline display
- Notes board (local state)
- Heart pings (local state)
- Chat (local state)
- BGM player UI

🔄 **Firebase Integration (Optional):**
To enable real-time synchronization between users, you'll need to:
1. Set up Firebase credentials in `.env.local`
2. The Firestore integration is already set up in `lib/firebase.ts`
3. Components can be enhanced to use Firestore listeners

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Tailwind Styles Not Working
Make sure TailwindCSS 4 is properly installed. The project uses the new Tailwind v4 syntax.

### Firebase Connection Errors
- Check your `.env.local` file
- Verify Firebase project settings
- Ensure Firestore is enabled in Firebase Console

## Customization Tips

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --rose-pink: #ff6b9d;
  --soft-lilac: #c8a2c8;
  --champagne-gold: #f7d794;
}
```

### Change Fonts
Edit `app/layout.tsx` and `app/globals.css` to use different Google Fonts

### Add More Animations
Use Framer Motion in components for custom animations:
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
```

## Next Steps

1. Add your own photos to `public/images/`
2. Update timeline events with your memories
3. Set up Firebase for real-time features
4. Deploy to Vercel
5. Share with your partner! 💕

## Support

For issues or questions:
- Check the README.md
- Review component files in `components/`
- Ensure all dependencies are installed correctly


# 🎵 Music Setup Guide

## Quick Answer: Where to Put Music Files

**Location:** Place your music files in `public/music/` directory

### Example:
```
public/
  └── music/
      └── your-love-song.mp3
```

Then reference it in your code as: `/music/your-love-song.mp3`

---

## How to Add Music

### Option 1: Basic HTML5 Audio (Recommended for Quick Setup)

1. **Add your music file to `public/music/`**
   - Example: `public/music/our-song.mp3`

2. **Use the enhanced player component**
   - I've created `BGMPlayerEnhanced.tsx` which uses HTML5 audio
   - Update the `src` prop in the audio element:
   ```tsx
   <audio
     ref={audioRef}
     src="/music/your-song.mp3" // ← Change this to your file
     loop
   />
   ```

3. **Use the enhanced player in your dashboard**
   - In `app/dashboard/page.tsx`, you can replace `BGMPlayer` with `BGMPlayerEnhanced`

### Option 2: React Howler (For Advanced Features)

1. **Install React Howler** (already installed):
   ```bash
   pnpm add react-howler
   ```

2. **Add your music file** to `public/music/`

3. **Update BGMPlayer.tsx** to use Howler:
   ```tsx
   import { Howl } from 'howler';
   
   const sound = new Howl({
     src: ['/music/your-song.mp3'],
     loop: true,
     volume: 0.5,
   });
   
   // Use sound.play(), sound.pause(), sound.volume(), etc.
   ```

---

## Supported Audio Formats

- ✅ **MP3** (.mp3) - Best compatibility
- ✅ **OGG** (.ogg) - Better quality, smaller size
- ✅ **WAV** (.wav) - High quality but large files

**Recommendation:** Use MP3 for best compatibility across browsers

---

## Step-by-Step: Adding Your First Song

### Step 1: Add Music File
```bash
# Copy your music file to public/music/
# Example: my-romantic-song.mp3
```

### Step 2: Update Player Component

Edit `components/BGMPlayerEnhanced.tsx`:

```tsx
<audio
  ref={audioRef}
  src="/music/my-romantic-song.mp3" // ← Your filename here
  loop
  onEnded={() => setIsPlaying(false)}
/>
```

### Step 3: Use Enhanced Player (Optional)

In `app/dashboard/page.tsx`, you can switch to the enhanced version:

```tsx
// Replace this line:
import BGMPlayer from '@/components/BGMPlayer';

// With this:
import BGMPlayer from '@/components/BGMPlayerEnhanced';
```

---

## Free Royalty-Free Music Sources

1. **BenSound** - https://www.bensound.com/
   - Free downloads with attribution
   - Romantic, ambient music

2. **Free Music Archive** - https://freemusicarchive.org/
   - CC-licensed music
   - Wide variety of genres

3. **YouTube Audio Library** - https://studio.youtube.com/
   - Free music for YouTube creators
   - Safe to use in web projects

4. **Incompetech** - https://incompetech.com/music/royalty-free/
   - Kevin MacLeod's royalty-free music
   - Creative Commons licenses

---

## Current Setup

The app currently has a **UI-only** music player. To make it play music:

### Quick Setup (5 minutes):
1. Add an MP3 file to `public/music/`
2. Uncomment the audio element in `BGMPlayerEnhanced.tsx`
3. Update the `src` attribute with your filename
4. The player is ready!

### Full Setup:
1. Add music file to `public/music/`
2. Import and use the enhanced player
3. Enjoy your romantic background music! 💕

---

## Troubleshooting

### Music Not Playing?
- Check file path: Should be `/music/filename.mp3`
- Check browser console for errors
- Ensure file format is supported (MP3 recommended)
- Check file permissions

### Audio Playback Blocked?
Modern browsers require user interaction before playing audio. The play button fixes this.

### Volume Control Not Working?
Make sure you're using the enhanced player with proper audio ref handlers.

---

## Example Implementation

Here's a complete working example:

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function WorkingBGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleBGM = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 glass p-4 rounded-2xl">
      <audio
        ref={audioRef}
        src="/music/your-song.mp3" // Your file here
        loop
      />
      <button onClick={toggleBGM}>
        {isPlaying ? <Music /> : <Music />}
      </button>
    </div>
  );
}
```

---

## Summary

**To add music:**
1. Put file in `public/music/`
2. Reference as `/music/filename.mp3`
3. Use HTML5 audio or React Howler
4. Enjoy! 🎵

Happy listening! 💕


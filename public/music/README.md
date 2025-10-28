# 🎵 Background Music

## Where to Put Music Files

Place your audio files in this directory (`public/music/`).

## Supported Formats
- MP3 (.mp3) - **Recommended**
- OGG (.ogg)
- WAV (.wav) - Large file sizes, not recommended for web

## Adding Music

1. Add your music file here, for example: `love-song.mp3`
2. Update the BGMPlayer component to use it

### Example:
If you add `our-song.mp3`, you would reference it as `/music/our-song.mp3` in the component.

## Copyright Notice
⚠️ Only use music you have rights to or royalty-free music.

## Free Royalty-Free Music Sources
- https://www.bensound.com/
- https://freemusicarchive.org/
- https://incompetech.com/music/royalty-free/
- https://www.zapsplat.com/

## Implementation Example

In `components/BGMPlayer.tsx`, you would use React Howler like this:

```tsx
import { Howler } from 'react-howler';

<Howler
  src="/music/your-song.mp3"
  playing={isPlaying}
  volume={volume}
  mute={isMuted}
  loop={true}
/>
```

Or use the HTML5 audio player:

```tsx
<audio 
  src="/music/your-song.mp3"
  loop
  autoPlay={isPlaying}
  volume={volume}
/>
```

## Setup Instructions

1. Add your `.mp3` file to this directory
2. Update `components/BGMPlayer.tsx` to load your audio file
3. The player will appear in the bottom-right corner of the dashboard


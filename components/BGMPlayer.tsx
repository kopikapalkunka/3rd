'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const musicPlaylist = [
  '/music/Ardhito Pramono - Waking Up Together With You (Official Lyric Video) [YfhgLhAabR0].mp3',
  '/music/Billie Eilish - BIRDS OF A FEATHER (Official Lyric Video) [d5gf9dXbPi0].mp3',
  '/music/d4vd - Here With Me (Official Audio) [B7Y4LHbpXv0].mp3',
  '/music/girl in red - we fell in love in october [iggmiF7DNoM].mp3',
  '/music/H.E.R. - Best Part (Lyrics) Ft. Daniel Caesar [75-Com9Bo_s].mp3',
  '/music/John Mayer - You\'re Gonna Live Forever In Me (Lyrics) [-xk8wIQDBi8].mp3',
  '/music/The Night We Met — Lord Huron (Lyrics) [Cq4-iUAh-ok].mp3',
  '/music/wave to earth - love. (Official Lyric Video) [Q49pnA4jsp8].mp3',
];

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update audio element properties when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      
      if (isPlaying && audioRef.current.paused) {
        audioRef.current.play().catch((e) => {
          console.error('Play error:', e);
          setIsPlaying(false);
        });
      } else if (!isPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted]);

  const toggleBGM = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.error('Play error:', e);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicPlaylist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicPlaylist.length) % musicPlaylist.length);
  };

  const handleTrackEnd = () => {
    setCurrentTrack((prev) => (prev + 1) % musicPlaylist.length);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicPlaylist[currentTrack]}
        loop={false}
        onEnded={handleTrackEnd}
        preload="auto"
      />

      {/* Player UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 glass p-4 rounded-2xl backdrop-blur-sm shadow-lg z-50"
      >
        <div className="flex flex-col gap-3">
          {/* Track info */}
          <div className="text-xs text-rose-600 text-center max-w-[300px] truncate">
            {currentTrack + 1}/{musicPlaylist.length}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="text-rose-600 hover:text-rose-700"
              title="Previous track"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleBGM}
              className="text-rose-600 hover:text-rose-700"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Music className="w-6 h-6" />
              ) : (
                <Music className="w-6 h-6 opacity-50" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="text-rose-600 hover:text-rose-700"
              title="Next track"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Volume controls */}
          {isPlaying && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-rose-600 hover:text-rose-700"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 accent-rose-600 h-2"
              />
              <span className="text-xs text-rose-600 min-w-[35px] text-center">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}


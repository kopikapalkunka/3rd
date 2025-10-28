'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function BGMPlayerEnhanced() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleBGM = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Audio element - invisible */}
      <audio
        ref={audioRef}
        src="/music/your-song.mp3" // Replace with your music file
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Player UI */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 glass p-4 rounded-2xl backdrop-blur-sm shadow-lg z-50"
      >
        <div className="flex items-center gap-3">
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
          {isPlaying && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-rose-600 hover:text-rose-700"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-24 accent-rose-600"
              />
              <span className="text-xs text-rose-600 min-w-[30px] text-center">
                {Math.round(volume * 100)}%
              </span>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}


'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import confetti from 'canvas-confetti';

export default function HeartPing() {
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [isVibrating, setIsVibrating] = useState(false);
  const user = useStore((state) => state.user);
  const lastHeartPing = useStore((state) => state.lastHeartPing);
  const setHeartPing = useStore((state) => state.setHeartPing);

  const handleHeartClick = () => {
    if (user) {
      // Create heart particles
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          setHearts((prev) => [
            ...prev,
            {
              id: Date.now() + i,
              x: 50 + Math.random() * 40,
            },
          ]);
        }, i * 100);
      }

      // Trigger vibration on partner's screen
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }

      // Trigger vibration animation
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 300);

      // Save to store (in real app, would sync with Firestore)
      setHeartPing({
        from: user.role,
        timestamp: Date.now(),
      });

      // Trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b9d', '#ffc0cb', '#ff69b4', '#c8a2c8'],
      });
    }
  };

  // Remove hearts after animation
  setTimeout(() => {
    setHearts([]);
  }, 3000);

  return (
    <div className="glass p-6 rounded-3xl backdrop-blur-sm text-center">
      <h2 className="text-3xl romantic-font text-rose-700 mb-6">Send Your Love ❤️</h2>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleHeartClick}
        className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all ${
          isVibrating ? 'vibrate' : ''
        }`}
      >
        <Heart className="w-12 h-12 text-white fill-white" />
      </motion.button>
      <p className="mt-4 text-gray-600">Click the heart to ping your partner! 💕</p>
      {lastHeartPing && lastHeartPing.from !== user?.role && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-3 bg-rose-100 rounded-xl"
        >
          <p className="text-rose-700 font-semibold">
            💌 Your partner just sent you love!
          </p>
        </motion.div>
      )}

      {/* Heart particles */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{
              left: `${heart.x}%`,
              bottom: '10%',
            }}
            animate={{
              y: -500,
              opacity: [1, 1, 0],
              scale: [0.5, 1, 1.5],
            }}
            transition={{
              duration: 3,
              ease: 'easeOut',
            }}
          >
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}


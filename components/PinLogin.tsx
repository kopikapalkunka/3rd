'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { validatePin } from '@/utils/pinAuth';
import { useStore } from '@/lib/store';

export default function PinLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = validatePin(pin);
    
    if (result.valid && result.role) {
      setUser({ role: result.role, pin, name: result.name });
      router.push('/dashboard');
    } else {
      setError('Invalid PIN');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-200 via-pink-200 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-8 rounded-3xl shadow-2xl max-w-md w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <Heart className="w-16 h-16 text-rose-600 fill-rose-600 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-5xl romantic-font text-rose-700 mb-2">
            Our Journey
          </h1>
          <p className="text-lilac text-lg">Enter your special PIN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl border-2 border-lilac/30 focus:border-rose-500 focus:outline-none text-center text-2xl tracking-widest bg-white/50 backdrop-blur-sm"
              maxLength={8}
              autoFocus
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2 text-center"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Unlock Our Memories
          </motion.button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">💞 Celebrating 3 years of love</p>
          <p className="text-xs">PIN Format: ddmmyyyy or yyyymmdd</p>
        </div>
      </motion.div>
    </div>
  );
}


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useStoreInitializer } from '@/hooks/useStoreInitializer';
import CountdownTimer from '@/components/CountdownTimer';
import TimelineGallery from '@/components/TimelineGallery';
import NotesBoard from '@/components/NotesBoard';
import HeartPing from '@/components/HeartPing';
import Chat from '@/components/Chat';
import BGMPlayer from '@/components/BGMPlayer';
import MoodTracker from '@/components/MoodTracker';
import PhotoUpload from '@/components/PhotoUpload';
import ThemeToggle from '@/components/ThemeToggle';
import ConfettiEffect from '@/components/ConfettiEffect';

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const user = useStore((state) => state.user);
  const clearUser = useStore((state) => state.clearUser);
  const { initialized } = useStoreInitializer();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && initialized && !user) {
      router.push('/');
    }
  }, [mounted, initialized, user, router]);

  if (!mounted || !initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    clearUser();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-300 rounded-full opacity-20 blur-3xl float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-purple-300 rounded-full opacity-20 blur-3xl float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl romantic-font text-rose-700 mb-2">
              Welcome, {user.name || (user.role === 'female' ? 'Love' : 'Dear')} 💕
            </h1>
            <p className="text-gray-600">Celebrating {new Date().getFullYear() - 2022} years of beautiful moments together</p>
          </div>
          <div className="flex gap-3">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="glass px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/40 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <CountdownTimer />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-3xl backdrop-blur-sm"
          >
            <TimelineGallery />
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NotesBoard />
          </motion.div>
        </div>

        {/* Heart Ping and Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <HeartPing />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Chat />
          </motion.div>
        </div>

        {/* Mood Tracker and Photo Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MoodTracker />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <PhotoUpload />
          </motion.div>
        </div>
      </div>

      {/* BGM Player */}
      <BGMPlayer />
      
      {/* Confetti on special events */}
      <ConfettiEffect />
    </div>
  );
}


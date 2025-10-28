'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { getAnniversaryDate } from '@/utils/pinAuth';

export default function CountdownTimer() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = getAnniversaryDate();
    
    const updateTimer = () => {
      const now = dayjs();
      const diff = targetDate.getTime() - now.valueOf();
      
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Redirect to celebration page when countdown ends
        router.push('/celebration');
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      layout
      className="flex flex-col items-center glass p-6 rounded-2xl min-w-[100px]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="text-5xl font-bold text-rose-700"
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <span className="text-sm text-gray-600 mt-2 uppercase tracking-wide">
        {label}
      </span>
    </motion.div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl p-8 shadow-lg">
      <h2 className="text-3xl romantic-font text-center text-rose-700 mb-6">
        Until Our Next Anniversary
      </h2>
      <div className="flex gap-4 justify-center flex-wrap">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
}


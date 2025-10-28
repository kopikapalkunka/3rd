'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Heart, CloudRain, Sun } from 'lucide-react';
import { useStore } from '@/lib/store';

const moods = [
  { emoji: '❤️', label: 'In Love', color: 'bg-red-100 text-red-600', icon: Heart },
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 text-yellow-600', icon: Smile },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-600', icon: Frown },
  { emoji: '🌧️', label: 'Rainy', color: 'bg-gray-100 text-gray-600', icon: CloudRain },
  { emoji: '☀️', label: 'Sunny', color: 'bg-orange-100 text-orange-600', icon: Sun },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const user = useStore((state) => state.user);
  const setMood = useStore((state) => state.setMood);
  const moodsState = useStore((state) => state.moods);

  const handleMoodSelect = (moodEmoji: string) => {
    if (!user) return;
    
    setSelectedMood(moodEmoji);
    setMood(user.role, {
      emoji: moodEmoji,
      timestamp: Date.now(),
    });
  };

  const partnerMood = user?.role === 'female' ? moodsState.male : moodsState.female;
  const currentUserMood = moodsState[user?.role || 'female'];

  return (
    <div className="glass p-6 rounded-3xl backdrop-blur-sm">
      <h2 className="text-3xl romantic-font text-rose-700 mb-6">
        Today's Mood ☀️
      </h2>

      {/* Select your mood */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {moods.map((mood, index) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.emoji || currentUserMood?.emoji === mood.emoji;
          
          return (
            <motion.button
              key={mood.emoji}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.emoji)}
              className={`
                p-4 rounded-2xl transition-all
                ${isSelected ? mood.color : 'bg-white/50 hover:bg-gray-100'}
                ${isSelected ? 'ring-2 ring-offset-2 ring-rose-400' : ''}
              `}
            >
              <Icon className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl">{mood.emoji}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Partner's mood */}
      {partnerMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 rounded-2xl bg-rose-50/50 border border-rose-200"
        >
          <p className="text-sm text-gray-600 mb-1">Partner's Mood</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{partnerMood.emoji}</span>
            <div>
              <p className="font-semibold text-gray-800">
                {user?.role === 'female' ? 'He' : 'She'} is feeling this!
              </p>
              <p className="text-xs text-gray-500">
                {new Date(partnerMood.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Your current mood */}
      {currentUserMood && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass p-4 rounded-2xl bg-purple-50/50 border border-purple-200"
        >
          <p className="text-sm text-gray-600 mb-1">Your Mood</p>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentUserMood.emoji}</span>
            <p className="font-semibold text-gray-800">
              You're feeling great! 💕
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}


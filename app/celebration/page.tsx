'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CelebrationPage() {
  const [loaded, setLoaded] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopup3, setShowPopup3] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // Continuous confetti effect
    const duration = 5000;
    const end = Date.now() + duration;
    
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      // Hearts confetti
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b9d', '#ffc0cb', '#ff69b4', '#c8a2c8', '#ffe4e1'],
      });
      
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b9d', '#ffc0cb', '#ff69b4', '#c8a2c8', '#ffe4e1'],
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Show popups in sequence
  useEffect(() => {
    if (loaded) {
      setTimeout(() => setShowPopup1(true), 15000);
      setTimeout(() => setShowPopup2(true), 18000);
      setTimeout(() => setShowPopup3(true), 21000);
    }
  }, [loaded]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '100vh', x: Math.random() * 100 }}
            animate={{
              y: '-100vh',
              x: Math.random() * 100,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'linear',
            }}
            className="absolute text-4xl"
          >
            💕
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center space-y-8 max-w-4xl"
      >
        {/* Main celebration message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-9xl mb-8"
          >
            🎉
          </motion.div>
          
          <h1 className="text-7xl romantic-font text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mb-6">
            Happy Anniversary!
          </h1>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-4xl text-gray-800 mb-8"
        >
          <p className="romantic-font text-rose-600">Annas Tasya Esti Aryus Jannah</p>
          <p className="text-6xl my-4">💕</p>
          <p className="romantic-font text-rose-600">Achmad Rizal Efendy</p>
        </motion.div>

        {/* Special message */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="space-y-4"
        >
          <p className="text-2xl text-gray-700 mb-8">
            Today marks another beautiful year together! ✨
          </p>
          
          <div className="glass p-8 rounded-3xl backdrop-blur-sm shadow-2xl space-y-6 max-w-4xl">
            <div className="flex items-center justify-center gap-3 text-rose-600 mb-4">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-3xl romantic-font">Your Love Story Continues</h2>
              <Star className="w-8 h-8" />
            </div>
            
            {/* Love Letter */}
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="leading-relaxed mb-4">
                Boo, aku tahu we've been through a lot. Semuaaaa hal tawa, nangis, marah, diam-diam saling ngambek, lalu baikan lagi semuanya jadi bagian dari cerita kita. Thank you for staying, for still choosing me even when I'm hard to love sometimes. Maaf kalau aku sering bikin kamu kecewa, tapi aku selalu berusaha buat belajar mencintai kamu dengan cara yang lebih baik.
              </p>
              
              <p className="leading-relaxed mb-4">
                Kadang aku mikir, maybe love isn't about always being perfect, but about staying even when things get messy. Karena dari semua yang udah kita lewati, aku sadar satu hal: aku nggak mau kehilangan kamu. Aku mau terus jalan bareng kamu, entah sesusah apa pun nanti.
              </p>
              
              <blockquote className="border-l-4 border-rose-400 pl-6 italic my-6 text-rose-600">
                "I fell in love the way you fall asleep: slowly, and then all at once."
                <br />
                <span className="text-sm text-gray-500">— John Green, The Fault in Our Stars</span>
              </blockquote>
              
              <p className="leading-relaxed mb-4">
                Kamu itu rumah, tempat di mana semua hal terasa lebih tenang. Dan setiap kali aku lihat kamu, aku inget kenapa aku masih di sini. Aku harap cinta kita nggak berhenti, nggak pudar, cuma terus tumbuh mungkin nggak selalu mudah, tapi selalu nyata. I love you so much.
              </p>
              
              <blockquote className="border-l-4 border-rose-400 pl-6 italic my-6 text-rose-600">
                "Whatever our souls are made of, his and mine are the same."
                <br />
                <span className="text-sm text-gray-500">— Emily Brontë, Wuthering Heights</span>
              </blockquote>
              
              <p className="leading-relaxed mb-6">
                So once again, thank you, and I'm sorry. For everything, and for still being here. I hope our love doesn't end at all not today, not tomorrow, not ever.
              </p>
              <p className="leading-relaxed mb-6">
                I love you so much sayangggg love u more than i can say sumpahh i miss u so much so fking bad i want u here so bad arrghhhh sayangggkuu cantikkkuu cintakuu belahan jiwakuu
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-4">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-rose-600 text-xl font-semibold">
                Forever & Always
              </span>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Animated counters */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="grid grid-cols-3 gap-6 mt-12"
        >
          {[
            { number: '1095+', label: 'Days Together', emoji: '💕' },
            { number: '∞', label: 'Memories Made', emoji: '✨' },
            { number: '💝', label: 'Love Forever', emoji: '💖' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="glass p-6 rounded-2xl backdrop-blur-sm"
            >
              <p className="text-5xl mb-2">{stat.emoji}</p>
              <p className="text-4xl font-bold text-rose-600 mb-2">
                {stat.number}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating sparkles */}
      {typeof window !== 'undefined' && [...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          className="absolute text-yellow-400"
        >
          ✨
        </motion.div>
      ))}

      {/* Popup 1 */}
      {showPopup1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="glass p-12 rounded-3xl backdrop-blur-xl shadow-2xl border-2 border-green-400 text-center max-w-md pointer-events-auto">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🛡️
            </motion.div>
            <h2 className="text-4xl romantic-font text-green-600 mb-2">
              Stay Safe
            </h2>
            <p className="text-gray-600">Take care of yourself, always</p>
          </div>
        </motion.div>
      )}

      {/* Popup 2 */}
      {showPopup2 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="glass p-12 rounded-3xl backdrop-blur-xl shadow-2xl border-2 border-blue-400 text-center max-w-md pointer-events-auto">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              💊
            </motion.div>
            <h2 className="text-4xl romantic-font text-blue-600 mb-2">
              Stay Healthy
            </h2>
            <p className="text-gray-600">Your health is everything to me</p>
          </div>
        </motion.div>
      )}

      {/* Popup 3 */}
      {showPopup3 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="glass p-12 rounded-3xl backdrop-blur-xl shadow-2xl border-2 border-rose-400 text-center max-w-md pointer-events-auto">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              💕
            </motion.div>
            <h2 className="text-4xl romantic-font text-rose-600 mb-2">
              And Stay With Me
            </h2>
            <p className="text-gray-600">Forever and always, my love</p>
            <button
              onClick={() => {
                setShowPopup1(false);
                setShowPopup2(false);
                setShowPopup3(false);
              }}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              I Will Forever ❤️
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}


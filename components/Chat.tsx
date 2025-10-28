'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useStore } from '@/lib/store';
import dayjs from 'dayjs';

export default function Chat() {
  const [message, setMessage] = useState('');
  const messages = useStore((state) => state.messages);
  const addMessage = useStore((state) => state.addMessage);
  const user = useStore((state) => state.user);

  const handleSend = () => {
    if (message.trim() && user) {
      addMessage({
        id: Date.now().toString(),
        text: message,
        author: user.role,
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  return (
    <div className="glass p-6 rounded-3xl backdrop-blur-sm">
      <h2 className="text-3xl romantic-font text-rose-700 mb-6">Chat 💬</h2>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
        <AnimatePresence>
          {messages.map((msg) => {
            const isMe = msg.author === user?.role;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-3 ${
                    isMe
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
                      : 'bg-white/70 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {dayjs(msg.timestamp).format('h:mm A')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {messages.length === 0 && (
        <p className="text-center text-gray-500 py-4">Start the conversation! 💕</p>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-2xl border-2 border-lilac/30 focus:border-rose-500 focus:outline-none bg-white/50 backdrop-blur-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-3 rounded-2xl px-6 shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}


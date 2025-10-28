'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pin, PinOff } from 'lucide-react';
import { useStore } from '@/lib/store';
import dayjs from 'dayjs';

export default function NotesBoard() {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const notes = useStore((state) => state.notes);
  const addNote = useStore((state) => state.addNote);
  const removeNote = useStore((state) => state.removeNote);
  const togglePinNote = useStore((state) => state.togglePinNote);
  const user = useStore((state) => state.user);

  const handleAddNote = () => {
    if (newNote.trim() && user) {
      const note = {
        id: Date.now().toString(),
        text: newNote,
        author: user.role,
        timestamp: Date.now(),
        pinned: false,
      };
      addNote(note);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="glass p-6 rounded-3xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl romantic-font text-rose-700">Notes 💌</h2>
        {!isAdding && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAdding(true)}
            className="bg-rose-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note..."
            className="w-full p-4 rounded-2xl border-2 border-lilac/30 focus:border-rose-500 focus:outline-none bg-white/50 backdrop-blur-sm resize-none"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddNote}
              className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-xl font-semibold"
            >
              Post
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsAdding(false);
                setNewNote('');
              }}
              className="px-4 py-2 bg-gray-200 rounded-xl"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        <AnimatePresence>
          {sortedNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-gray-800">{note.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {dayjs(note.timestamp).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => togglePinNote(note.id)}
                    className="text-lilac hover:text-rose-500"
                  >
                    {note.pinned ? (
                      <Pin className="w-5 h-5 fill-current" />
                    ) : (
                      <PinOff className="w-5 h-5" />
                    )}
                  </motion.button>
                  {note.author === user?.role && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeNote(note.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {notes.length === 0 && (
        <p className="text-center text-gray-500 py-8">No notes yet. Add your first note! 💌</p>
      )}
    </div>
  );
}


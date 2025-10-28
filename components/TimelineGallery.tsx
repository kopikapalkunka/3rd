'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import type { TimelineEvent } from '@/types';

const sampleTimeline: TimelineEvent[] = [
  {
    id: '1',
    title: 'First Meeting',
    date: '2022-10-29',
    description: 'The day our story began ✨',
    image: undefined,
  },
  {
    id: '2',
    title: 'First Date',
    date: '2022-11-05',
    description: 'Coffee and endless conversations ☕',
  },
  {
    id: '3',
    title: 'Our Anniversary',
    date: '2022-10-29',
    description: 'Celebrating love each passing day 💕',
  },
];

export default function TimelineGallery() {
  const [events, setEvents] = useState<TimelineEvent[]>(sampleTimeline);

  return (
    <div className="w-full space-y-8 py-8">
      <h2 className="text-3xl romantic-font text-center text-rose-700 mb-8">
        Our Journey Together
      </h2>
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center gap-6 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className="flex-1 glass p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-rose-500" />
                <span className="text-sm text-gray-600">{event.date}</span>
              </div>
              <h3 className="text-2xl font-semibold text-rose-700 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              {index < events.length - 1 && (
                <div className="absolute top-16 left-1/2 w-0.5 h-20 bg-gradient-to-b from-rose-400 to-transparent -translate-x-1/2" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


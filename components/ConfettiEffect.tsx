'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger?: boolean;
  type?: 'normal' | 'hearts' | 'love';
}

export default function ConfettiEffect({ trigger, type = 'normal' }: ConfettiEffectProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!trigger || hasTriggered.current) return;
    
    hasTriggered.current = true;
    
    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (type === 'hearts' || type === 'love') {
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
      } else {
        // Normal confetti
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      if (Date.now() > end) {
        clearInterval(interval);
        hasTriggered.current = false;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [trigger, type]);

  return null;
}


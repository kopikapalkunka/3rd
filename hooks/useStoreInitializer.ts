'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export const useStoreInitializer = () => {
  const { user, initialized, setUser, setInitialized } = useStore();
  
  useEffect(() => {
    if (!initialized && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('anniversary-user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
      setInitialized(true);
    }
  }, [initialized, setUser, setInitialized]);
  
  return { initialized };
};


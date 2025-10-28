import { create } from 'zustand';
import type { UserRole, Note, ChatMessage, TimelineEvent, HeartPing, Mood } from '@/types';

interface AppState {
  user: { role: UserRole; pin: string; name?: string } | null;
  notes: Note[];
  messages: ChatMessage[];
  timeline: TimelineEvent[];
  moods: { female?: Mood; male?: Mood };
  lastHeartPing: HeartPing | null;
  initialized: boolean;
  
  setUser: (user: { role: UserRole; pin: string; name?: string }) => void;
  clearUser: () => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  togglePinNote: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setTimeline: (timeline: TimelineEvent[]) => void;
  setMood: (role: UserRole, mood: Mood) => void;
  setHeartPing: (ping: HeartPing) => void;
  setInitialized: (value: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  notes: [],
  messages: [],
  timeline: [],
  moods: {},
  lastHeartPing: null,
  initialized: false,
  
  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('anniversary-user', JSON.stringify(user));
    }
    set({ user });
  },
  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('anniversary-user');
    }
    set({ user: null });
  },
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (id) => set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  togglePinNote: (id) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTimeline: (timeline) => set({ timeline }),
  setMood: (role, mood) =>
    set((state) => ({
      moods: { ...state.moods, [role]: mood },
    })),
  setHeartPing: (ping) => set({ lastHeartPing: ping }),
  setInitialized: (value) => set({ initialized: value }),
}));


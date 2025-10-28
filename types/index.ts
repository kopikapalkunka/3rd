export type UserRole = 'female' | 'male';

export interface User {
  role: UserRole;
  pin: string;
  name?: string;
}

export interface Note {
  id: string;
  text: string;
  author: UserRole;
  timestamp: number;
  pinned: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  author: UserRole;
  timestamp: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface Mood {
  emoji: string;
  timestamp: number;
}

export interface HeartPing {
  from: UserRole;
  timestamp: number;
}


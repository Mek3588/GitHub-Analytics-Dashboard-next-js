import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  isAuthenticated: boolean;
  layoutPreference: 'compact' | 'comfortable';
}

interface AuthStore {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setLayoutPreference: (preference: 'compact' | 'comfortable') => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: {
        username: '',
        isAuthenticated: false,
        layoutPreference: 'comfortable',
      },
      login: (username: string, password: string) => {
        if (username === 'admin' && password === 'admin123') {
          set({ user: { username, isAuthenticated: true, layoutPreference: 'comfortable' } });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: { username: '', isAuthenticated: false, layoutPreference: 'comfortable' } });
      },
      setLayoutPreference: (preference) => {
        set((state) => ({
          user: { ...state.user, layoutPreference: preference },
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
import { IUser } from '@/types/user.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;

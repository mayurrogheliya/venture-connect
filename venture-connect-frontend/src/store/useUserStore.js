import { create } from 'zustand';
export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
}));

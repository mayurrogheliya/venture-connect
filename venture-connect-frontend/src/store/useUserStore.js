import { create } from 'zustand';
export const useUserStore = create((set) => {
  const savedToken = localStorage.getItem('accessToken');
  const isAuthenticated = savedToken != null;
  return {
    user: null,
    loading: false,
    accessToken: savedToken,
    isAuthenticated,
    setLoading: (loading) => set({ loading }),
    login: (user, token) => {
      localStorage.setItem('accessToken', token);
      set({ user, isAuthenticated: true, accessToken: token });
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false, accessToken: null });
    },
  };
});

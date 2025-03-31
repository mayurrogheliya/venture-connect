import { create } from 'zustand';
import { usersAPI } from '../api/endpoints/users';
import { message } from 'antd';
export const useUserStore = create((set) => {
  const savedToken = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const isAuthenticated = savedToken !== null;
  return {
    user: null,
    userId: userId,
    loading: false,
    accessToken: savedToken,
    isAuthenticated,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    login: (user, token) => {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userId', user.id);
      set({ user, isAuthenticated: true, accessToken: token });
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      set({ user: null, isAuthenticated: false, accessToken: null });
    },
    getUserById: async (userId) => {
      try {
        const response = await usersAPI.getUser(userId);
        const userData = response?.data;
        set({ user: userData });
        return userData;
      } catch (error) {
        console.log(error);
        message.error(error?.response?.data?.message);
      }
    },
  };
});

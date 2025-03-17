import { create } from 'zustand';
import { startupAPI } from '../api/endpoints/startup';
import { message } from 'antd';

export const useStartupProfileStore = create((set, get) => ({
  startupProfile: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setStartupProfile: (profile) => set({ startupProfile: profile }),

  getStartupProfile: async (startupId) => {
    try {
      const response = await startupAPI.getStartupProfile(startupId);
      if (response?.data?.startup) {
        get().setStartupProfile(response.data.startup);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.error('Error fetching startup profile:', error);
    }
  },
}));

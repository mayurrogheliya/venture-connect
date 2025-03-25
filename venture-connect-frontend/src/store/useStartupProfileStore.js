import { create } from 'zustand';
import { startupAPI } from '../api/endpoints/startup';
import { message } from 'antd';

export const useStartupProfileStore = create((set, get) => ({
  startupProfile: null,
  startupAllProfile: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setStartupProfile: (profile) => set({ startupProfile: profile }),
  setStartupAllProfile: (profile) => set({ startupAllProfile: profile }),
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

  getAllStartupProfiles: async () => {
    try {
      const response = await startupAPI.getAllStartupProfiles();
      console.log('my res', response);
      if (response?.data) {
        get().setStartupAllProfile(response?.data?.startups);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.error('Error fetching startup profile:', error);
    }
  },
}));

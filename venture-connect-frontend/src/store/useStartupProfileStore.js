import { create } from 'zustand';
import { startupAPI } from '../api/endpoints/startup';
import { message } from 'antd';

export const useStartupProfileStore = create((set, get) => ({
  mode: 'table',
  startupProfile: null,
  startupAllProfile: null,
  editingStartupProfile: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setStartupProfile: (profile) => set({ startupProfile: profile }),
  setStartupAllProfile: (profile) => set({ startupAllProfile: profile }),
  setEditingStartupProfile: (profile) =>
    set({ editingStartupProfile: profile }),
  setMode: (mode) => set({ mode }),

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

  getAllStartupProfiles: async (userId) => {
    try {
      const response = await startupAPI.getAllStartupProfiles();
      if (response?.data) {
        const startups = response?.data?.startups || [];
        get().setStartupAllProfile(
          startups.filter((startup) => startup.id !== userId),
        );
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.error('Error fetching startup profile:', error);
    }
  },
}));

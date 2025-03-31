import { create } from 'zustand';
import { message } from 'antd';
import { investoAPI } from '../api/endpoints/investor';

export const useInvestorProfileStore = create((set, get) => ({
  mode: 'table',
  investorProfile: null,
  investorAllProfile: null,
  editingInvestorProfile: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setInvestorProfile: (profile) => set({ investorProfile: profile }),
  setInvestorAllProfile: (profile) => set({ investorAllProfile: profile }),
  setEditingInvestorProfile: (profile) =>
    set({ editingInvestorProfile: profile }),
  setMode: (mode) => set({ mode }),

  getInvestorProfile: async (userId) => {
    try {
      const response = await investoAPI.getInvestorProfile(userId);
      if (response?.data?.investor) {
        get().setInvestorProfile(response?.data?.investor);
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.error('Error fetching investor profile:', error);
    }
  },

  getAllInvestorProfiles: async (userId) => {
    try {
      const response = await investoAPI.getAllInvestorProfiles();
      console.log('all investor response', response);
      if (response?.data) {
        const investors = response?.data?.investors || [];
        console.log('allInvestor profiles', investors);
        get().setInvestorAllProfile(
          investors.filter((investor) => investor.id !== userId),
        );
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
      console.error('Error fetching investor profile:', error);
    }
  },
}));

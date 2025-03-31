import { create } from 'zustand';

import { opportunityAPIs } from '../api/endpoints/opportunity';
import { toast } from 'react-toastify';

export const useOpportunites = create((set) => ({
  opportunities: [],
  startupopportunities: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setOpportunities: (opportunities) => set({ opportunities }),
  setstartupopportunities: (startupopportunities) =>
    set({ startupopportunities }),
  fechOpportunities: async () => {
    set({ loading: true });

    try {
      const response = await opportunityAPIs.getAllOpportunities();
      if (response.data && response.data.data) {
        set({ opportunities: response.data.data });
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      set({ loading: false });
    }
  },

  getStartUpOpportunities: async () => {
    set({ loading: true });

    try {
      const response = await opportunityAPIs.getAllOpportunitiesWithoutUserId();
      if (response.data && response.data.data) {
        set({ startupopportunities: response.data.data });
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      set({ loading: false });
    }
  },

  handledelete: async (id) => {
    set({ loading: true });
    try {
      const response = await opportunityAPIs.deleteopportunity(id);
      if (response.data && response.data.message) {
        toast.success(response.data.message);
        await useOpportunites.getState().fechOpportunities();
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

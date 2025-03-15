import { create } from 'zustand';
import { eventsAPIs } from '../api/endpoints/event';
export const useEventStore = create((set) => ({
  events: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setEvents: (events) => set({ events }),
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const response = await eventsAPIs.getAllEvents();
      if (response.data && response.data.data) {
        set({ events: response.data.data });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      set({ loading: false });
    }
  },
}));

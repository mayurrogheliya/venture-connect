import { create } from 'zustand';
import { eventsAttentAPIs } from '../api/endpoints/eventattendees';

export const useEventAttendStore = create((set) => ({
  eventAttendees: [],
  edit: { open: false, data: null },
  setEditData: (data) => set({ edit: { open: true, data } }),
  closeEditModal: () => set({ edit: { open: false, data: null } }),
  loading: false,
  fetchAttends: async (id) => {
    set({ loading: true });
    try {
      const response = await eventsAttentAPIs.getEventsAttent(id);
      set({ eventAttendees: response.data.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
}));

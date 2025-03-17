import api from '../axios';

export const eventsAttentAPIs = {
  getEventsAttent: (id) => api.get(`/event-attendees/getallattendees/${id}`),
  getEventByAttentId: (id) => api.get(`/event-attendees/getattendeebyid/${id}`),
  addEventAttent: (data) => api.post(`/event-attendees/registerevent`, data),
  updateEventAttend: (id, data) =>
    api.put(`/event-attendees/updateattendee/${id}`, data),
  deleteEventAttent: (id) =>
    api.delete(`/event-attendees/deleteattendee/${id}`),
};

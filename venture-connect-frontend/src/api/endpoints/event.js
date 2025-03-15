import { multipartRequest } from '../axios';

export const eventsAPIs = {
  getAllEvents: () => multipartRequest.get('/event/getallevents'),
  getEventById: (id) => multipartRequest.get(`event/geteventbyId/${id}`),
  createEvent: (data) => multipartRequest.post('/event/createevent', data),
  updateEvent: (id, data) =>
    multipartRequest.put(`/event/updateevent/${id}`, data),
  toggleEventStatus: (id) =>
    multipartRequest.put(`/event/toggleeventstatus/${id}`),
};

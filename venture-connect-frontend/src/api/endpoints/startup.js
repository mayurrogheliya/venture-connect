import { multipartRequest } from '../axios';

export const startupAPI = {
  createStartupProfile: (data) =>
    multipartRequest.post('/startup/createStartup', data),

  getStartupProfile: async (startupId) => {
    const response = await multipartRequest.get(
      `/startup/getStartup/${startupId}`,
    );
    return response.data;
  },

  getAllStartupProfiles: async () => {
    const response = await multipartRequest.get('/startup/getStartups');
    return response.data;
  },

  updateStartupProfile: (startupId, data) =>
    multipartRequest.put(`/startup/updateStartup/${startupId}`, data),

  deleteStartupProfile: (startupId) =>
    multipartRequest.delete(`/startup/deleteStartup/${startupId}`),
};

import api from '../axios';

export const authAPI = {
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  logout: () => api.post('/auth/logout'),
};

import api from '../axios.js';

export const usersAPI = {
  register: (data) => api.post('/users/register', data),
  getAllUsers: () => api.get('/users/getAllUsers'),
  getUser: (userId) => api.get(`/users/getUser/${userId}`),
  getStartupUsers: () => api.get('/users/getStartupUsers'),
  getInvestorUsers: () => api.get('/users/getInvestorUsers'),
};

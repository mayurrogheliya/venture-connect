import { multipartRequest } from '../axios';

export const investoAPI = {
  createInvestorProfile: (data) =>
    multipartRequest.post('/investor/createInvestor', data),

  getInvestorProfile: async (userId) => {
    const response = await multipartRequest.get(
      `/investor/getInvestor/${userId}`,
    );
    return response.data;
  },

  getAllInvestorProfiles: async () => {
    const response = await multipartRequest.get('/investor/getInvestors');
    return response.data;
  },

  updateInvestorProfile: (userId, data) =>
    multipartRequest.put(`/investor/updateInvestor/${userId}`, data),

  deleteInvestorProfile: (investorId) =>
    multipartRequest.delete(`/investor/deleteInvestor/${investorId}`),
};

import api from '../axios';

export const opportunityAPIs = {
  getAllOpportunities: () => api.get('/opportunity/getopportunity'),
  getByOpportunities: (id) => api.get(`/opportunity/getopportunitybyid/${id}`),
  createOpportunity: (data) => api.post(`/opportunity/createopportunity`, data),

  updateOpportunity: (id, data) =>
    api.put(`/opportunity/updateopportunity/${id}`, data),
  deleteopportunity: (id) => api.put(`/opportunity/deleteopportunity/${id}`),
  getAllOpportunitiesWithoutUserId: () =>
    api.get('/opportunity/getallopportunities'),
};

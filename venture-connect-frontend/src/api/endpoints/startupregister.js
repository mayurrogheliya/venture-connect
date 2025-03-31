import api from '../axios';

export const registerStartupAPIs = {
  getByIdregisterStartup: (id) =>
    api.get(`/registerstartup/getallregisteredstartups/${id}`),
  registerStartup: (id) =>
    api.post(`/registerstartup/registerstartup`, {
      opportunityId: id,
    }),

  deleteopportunity: (regId, userId, opportunityId) =>
    api.delete(`/registerstartup/deleteregisteredstartup/${regId}`, {
      data: { userId, opportunityId },
    }),
};

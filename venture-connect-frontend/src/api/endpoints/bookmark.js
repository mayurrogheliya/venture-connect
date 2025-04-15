import api from '../axios';

const bookmarkApi = {
  createBookmark: (startupId) => api.post('/bookmark/create', { startupId }),

  removeBookmark: (startupId) => api.delete(`/bookmark/delete/${startupId}`),

  getBookmarks: () => api.get('/bookmark/getbookmark'),
};

export default bookmarkApi;

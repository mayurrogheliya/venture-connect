// src/store/useBookmarkStore.js

import { create } from 'zustand';
import bookmarkApi from '../api/endpoints/bookmark'; // Assuming your API file path

export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  loading: false,
  setLoading: (loading) => set({ loading }),
  setBookmarks: (bookmarks) => set({ bookmarks }),
  bookmarkStatus: {},

  fetchBookmarks: async () => {
    set({ loading: true });
    try {
      const response = await bookmarkApi.getBookmarks();
      if (response.data && response.data.data) {
        set({ bookmarks: response.data.data });
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      set({ loading: false });
    }
  },

  // Add a bookmark
  addBookmark: async (startupId) => {
    set({ loading: true });
    try {
      const response = await bookmarkApi.createBookmark(startupId);
      if (response.data && response.data.data) {
        set((state) => ({
          bookmarks: [...state.bookmarks, response.data.data],
        }));
      }
      return response.data.message;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeBookmark: async (bookmarkId) => {
    set({ loading: true });
    try {
      const response = await bookmarkApi.removeBookmark(bookmarkId);
      set((state) => ({
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== bookmarkId,
        ),
      }));
      return response;
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));

import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as bookmarkController from '../controllers/bookmark.controller.js';

const router = Router();

router.post('/create', authMiddleware, bookmarkController.addBookmark);
router.delete(
  '/delete/:startupId',
  authMiddleware,
  bookmarkController.removeBookmark,
);
router.get('/getbookmark', authMiddleware, bookmarkController.getBookmarks);

export default router;

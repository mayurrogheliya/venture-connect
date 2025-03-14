import { Router } from 'express';
import * as authControllers from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', authControllers.login);
router.post('/logout', authMiddleware, authControllers.logout);

export default router;

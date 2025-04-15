import { Router } from 'express';
import startupRoutes from './startup.routes.js';
import eventRoutes from './event.routes.js';
import eventAttend from './eventAttend.routes.js';
import investorRoutes from './investor.routes.js';
import opportRoutes from './opportunity.routes.js';
import users from './user.routes.js';
import authRoutes from './auth.routes.js';
import registerStartupRoutes from './registerStartup.routes.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import bookmarkRouter from './bookmark.routes.js';
const router = Router();

router.use('/startup', authMiddleware, startupRoutes);
router.use('/event', eventRoutes);
router.use('/event-attendees', eventAttend);

router.use('/investor', authMiddleware, investorRoutes);
router.use('/opportunity', opportRoutes);
router.use('/users', users);
router.use('/auth', authRoutes);
router.use('/registerstartup', registerStartupRoutes);
router.use('/bookmark', bookmarkRouter);
export default router;

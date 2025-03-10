import { Router } from 'express';
import startupRoutes from './startup.routes.js';
import eventRoutes from './event.routes.js';
import investorRoutes from './investor.routes.js';
import opportRoutes from './opportunity.routes.js';
import users from './user.routes.js';

const router = Router();

router.use('/startup', startupRoutes);
router.use('/event', eventRoutes);
router.use('/investor', investorRoutes);
router.use('/opportunity', opportRoutes);
router.use('/users', users);

export default router;

import { Router } from 'express';
import startupRoutes from './startup.routes.js';
import eventRoutes from './event.routes.js';
import investorRoutes from './investor.routes.js';

const router = Router();

router.use('/startup', startupRoutes);
router.use('/event', eventRoutes);
router.use('/investor', investorRoutes);

export default router;

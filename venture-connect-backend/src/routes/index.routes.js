import { Router } from 'express';
import startupRoutes from './startup.routes.js';
import eventRoutes from './event.routes.js';
import opportRoutes from './opportunity.routes.js';
const router = Router();

router.use('/startup', startupRoutes);
router.use('/event', eventRoutes);
router.use('/opportunity', opportRoutes);

export default router;

import { Router } from 'express';
import startupRoutes from './startup.routes.js';
import eventRoutes from './event.routes.js';
const router = Router();

router.use('/startup', startupRoutes);
router.use('/event', eventRoutes);

export default router;

import { Router } from 'express';
import startupRoutes from './startup.routes.js';

const router = Router();

router.use('/startup', startupRoutes);

export default router;

import { Router } from 'express';
import * as startupController from '../controllers/startup.controller.js';
import { StartupUploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.post(
  '/createStartup',
  StartupUploadMiddleware,
  startupController.createStartupProfile,
);
router.get('/getStartups', startupController.getStartups);
router.get('/getStartup/:startupId', startupController.getStartup);
router.put(
  '/updateStartup/:startupId',
  StartupUploadMiddleware,
  startupController.updateStartupProfile,
);
router.delete('/deleteStartup/:startupId', startupController.deleteStartup);

export default router;

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
router.get('/getStartup/:userId', startupController.getStartup);
router.put(
  '/updateStartup/:userId',
  StartupUploadMiddleware,
  startupController.updateStartupProfile,
);
router.delete('/deleteStartup/:userId', startupController.deleteStartup);

export default router;

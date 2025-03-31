import express from 'express';
import * as registerStartupContoller from '../controllers/registerStartup.contoller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post(
  '/registerstartup',
  authMiddleware,
  registerStartupContoller.registerStartup,
);

router.get(
  '/getallregisteredstartups/:id',
  authMiddleware,
  registerStartupContoller.getAllRegisteredStartups,
);

router.delete(
  '/deleteregisteredstartup/:id',
  authMiddleware,
  registerStartupContoller.deleteRegisteredStartup,
);
export default router;

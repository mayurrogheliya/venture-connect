import { Router } from 'express';
import * as investoreController from '../controllers/investor.controller.js';
import { investorUploadMiddleware } from '../middlewares/uploadMiddleware.js';

const router = Router();

router.post(
  '/createInvestor',
  investorUploadMiddleware,
  investoreController.createInvestorProfile,
);
router.get('/getInvestors', investoreController.getInvestors);
router.get('/getInvestor/:userId', investoreController.getInvestor);
router.put(
  '/updateInvestor/:userId',
  investorUploadMiddleware,
  investoreController.updateInvestorProfile,
);
router.delete(
  '/deleteInvestor/:investorId',
  investoreController.deleteInvestorProfile,
);

export default router;

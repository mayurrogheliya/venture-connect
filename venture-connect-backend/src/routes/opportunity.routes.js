import express from 'express';
import * as opportunityController from '../controllers/opportunity.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/createopportunity',
  authMiddleware,
  opportunityController.createOpportunity,
);
router.get(
  '/getopportunity',
  authMiddleware,
  opportunityController.getAllOpportunity,
);
router.get(
  '/getopportunitybyid/:id',
  authMiddleware,
  opportunityController.getOpportunityById,
);
router.put(
  '/updateopportunity/:id',
  authMiddleware,
  opportunityController.updateOpportunity,
);
router.put(
  '/deleteopportunity/:id',
  authMiddleware,
  opportunityController.deleteOpportunity,
);
router.get(
  '/getallopportunities',
  authMiddleware,
  opportunityController.getAllOpportunitiesWithoutUserId,
);

export default router;

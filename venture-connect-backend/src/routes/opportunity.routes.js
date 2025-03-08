import express from 'express';
import * as opportunityController from '../controllers/opportunity.controller.js';

const router = express.Router();

router.post('/createopportunity', opportunityController.createOpportunity);
router.get('/getopportunity', opportunityController.getAllOpportunity);
router.get('/getopportunitybyid/:id', opportunityController.getOpportunityById);
router.put('/updateopportunity/:id', opportunityController.updateOpportunity);
router.put('/deleteopportunity/:id', opportunityController.deleteOpportunity);

export default router;

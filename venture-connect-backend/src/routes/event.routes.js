import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  toggleEventStatus,
  updateEvent,
} from '../controllers/event.controller.js';
import { EventUploadMiddleware } from '../middlewares/uploadMiddleware.js';
const router = express.Router();
router.post('/createevent', EventUploadMiddleware, createEvent);
router.get('/getallevents', getAllEvents);
router.get('/geteventbyId/:id', getEventById);
router.put('/updateevent/:id', EventUploadMiddleware, updateEvent);
router.put('/toggleeventstatus/:id', toggleEventStatus);
export default router;

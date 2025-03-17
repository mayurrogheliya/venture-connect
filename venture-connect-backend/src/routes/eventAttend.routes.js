import express from 'express';
import * as EventAttendController from '../controllers/eventAttend.controller.js';

const router = express.Router();

router.post('/registerevent', EventAttendController.registerForEvent);
router.get('/getallattendees/:id', EventAttendController.getAllAttendees);
router.get('/getattendeebyid/:id', EventAttendController.getAttendeeById);
router.put('/updateattendee/:id', EventAttendController.updateAttendee);
router.delete('/deleteattendee/:id', EventAttendController.deleteAttendee);

export default router;

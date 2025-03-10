import { Router } from 'express';
import * as userControllers from '../controllers/user.controller.js';

const router = Router();

router.post('/register', userControllers.registerUser);
router.get('/getAllUsers', userControllers.getAllUsers);
router.get('/getUser/:userId', userControllers.getUserById);
router.get('/getStartupUsers', userControllers.getAllStartupUsers);
router.get('/getInvestorUsers', userControllers.getAllInvestorUsers);

export default router;

import express from 'express';
import { signup, signin, forgotPassword, resetPassword, logout } from '../controllers/auth_controller.js';

const router = express.Router();

router.get('/logout', logout);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/password/forgot', forgotPassword);
router.patch('/password/reset', resetPassword);

export default router;
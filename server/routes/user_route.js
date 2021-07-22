import express from 'express';

import { getUsers, getUser, updateProfile, sendEmail, getSearchedUser, followProfile} from '../controllers/user_controller.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', auth, getUser);
router.get('/users', auth, getUsers);
router.get('/searchedUser/:username', auth, getSearchedUser);
router.post('/contact', sendEmail);
router.patch('/', auth, updateProfile);
router.patch('/follow/:id', auth, followProfile);

export default router;
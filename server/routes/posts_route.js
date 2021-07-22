import express from 'express';

import auth from '../middleware/auth.js';
import { fetchPosts, fetchUserPosts, createPost, updatePost, deletePost, reportPost, likePost, fetchPost, fetchPostImage } from '../controllers/posts_controller.js';

const router = express.Router();

router.get('/', auth, fetchPosts);
router.get('/post/image/:id', auth, fetchPostImage);
router.get('/post/:id', auth, fetchPost);
router.get('/user', auth, fetchUserPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/like/:id', auth, likePost);
router.patch('/report/:id', auth, reportPost);
router.delete('/:id', auth, deletePost);

export default router;
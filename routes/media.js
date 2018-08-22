import express from 'express';

import { uploadImage, addPost, getAllPosts, getPostById } from '../controllers/mediaController';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import diskStorageSingle from '../middlewares/diskStorage';
import authenticate from '../middlewares/authenticate';
import { getPostComments, addPostComments } from '../controllers/commentController';

const router = express.Router();

router.post('/content/image', authenticate, diskStorageSingle, asyncMiddleware(uploadImage));
router.post('/media', authenticate, asyncMiddleware(addPost));
router.get('/media', authenticate, asyncMiddleware(getAllPosts));
router.get('/media/:id', authenticate, asyncMiddleware(getPostById));
router.get('/:mediaId/comments', authenticate, asyncMiddleware(getPostComments));
router.post('/:mediaId/comments', authenticate, asyncMiddleware(addPostComments));

export default router;

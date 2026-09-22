import { Router } from 'express';
import { createPost, getFeed } from '../controllers/post.controller';
import { authenticateUser } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

import { toggleLike, addComment } from '../controllers/interaction.controller';

const router = Router();

// GET paginated feed
router.get('/', authenticateUser, getFeed);

// POST a new post with an optional 'media' file
router.post('/', authenticateUser, upload.single('media'), createPost);

// Interactions
router.post('/:postId/like', authenticateUser, toggleLike);
router.post('/:postId/comments', authenticateUser, addComment);

export default router;

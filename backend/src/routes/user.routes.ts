import { Router } from 'express';
import { toggleFollow } from '../controllers/follow.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

// Toggle follow on a user (userId is the ID of the user being followed)
router.post('/:userId/follow', authenticateUser, toggleFollow);

export default router;

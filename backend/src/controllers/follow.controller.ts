import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export const toggleFollow = async (req: Request, res: Response) => {
  try {
    const followerId = req.user?.id;
    const { userId: followingId } = req.params; // ID of the user being followed

    if (!followerId) return res.status(401).json({ error: 'Unauthorized' });
    if (followerId === followingId) return res.status(400).json({ error: 'Cannot follow yourself' });

    /* Note: DB queries commented out until DB is provisioned
    // Check if follow exists
    const existingFollow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { followerId_followingId: { followerId, followingId } }
      });
      return res.status(200).json({ message: 'Unfollowed successfully', isFollowing: false });
    } else {
      // Follow
      await prisma.follow.create({
        data: { followerId, followingId }
      });
      return res.status(200).json({ message: 'Followed successfully', isFollowing: true });
    }
    */
    
    res.status(200).json({ message: 'Follow status toggled (placeholder)', isFollowing: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

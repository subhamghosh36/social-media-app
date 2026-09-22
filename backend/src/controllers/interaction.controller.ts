import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    /* Note: DB queries commented out until DB is provisioned
    const existingLike = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId } }
    });

    if (existingLike) {
      await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
      return res.status(200).json({ message: 'Post unliked', isLiked: false });
    } else {
      await prisma.like.create({ data: { userId, postId } });
      return res.status(200).json({ message: 'Post liked', isLiked: true });
    }
    */

    res.status(200).json({ message: 'Like toggled (placeholder)', isLiked: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;
    const { content } = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!content) return res.status(400).json({ error: 'Comment content required' });

    /* Note: DB queries commented out until DB is provisioned
    const comment = await prisma.comment.create({
      data: { postId, userId, content }
    });
    */

    const mockComment = {
      id: 'comment-uuid',
      postId,
      userId,
      content,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({ message: 'Comment added', comment: mockComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

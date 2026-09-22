import { Request, Response } from 'express';
import { uploadToS3 } from '../utils/s3';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user?.id; // from auth middleware

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Post content is required' });
    }

    let mediaUrl = null;
    
    // Handle image upload if a file is present
    if (req.file) {
      try {
        mediaUrl = await uploadToS3(req.file);
      } catch (uploadError) {
        console.error('Failed to upload to S3:', uploadError);
        return res.status(500).json({ error: 'Failed to upload media' });
      }
    }

    // Save to database
    // *NOTE*: This will fail until the database is actually provisioned and migrated!
    /*
    const newPost = await prisma.post.create({
      data: {
        content,
        mediaUrl,
        userId,
      },
    });
    */

    // Placeholder response simulating successful DB insert
    const mockPost = {
      id: 'new-post-uuid',
      content,
      mediaUrl,
      userId,
      createdAt: new Date().toISOString()
    };

    res.status(201).json({ message: 'Post created successfully', post: mockPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFeed = async (req: Request, res: Response) => {
  try {
    // Pagination params
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor as string;

    // Prisma cursor-based pagination query (Commented out until DB is live)
    /*
    const posts = await prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true } },
        _count: { select: { likes: true, comments: true } }
      }
    });
    */

    // Mock data
    const mockPosts = [
      {
        id: 'post-1',
        content: 'Hello world!',
        mediaUrl: null,
        createdAt: new Date().toISOString(),
        user: { id: 'user-1', username: 'johndoe', avatarUrl: null },
        _count: { likes: 5, comments: 2 }
      }
    ];

    res.status(200).json({ 
      data: mockPosts, 
      nextCursor: mockPosts.length > 0 ? mockPosts[mockPosts.length - 1].id : null 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

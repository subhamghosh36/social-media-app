import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      }
    }
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement actual JWT validation here
  
  // Placeholder: Injecting a mock user UUID to allow development of protected routes
  req.user = {
    id: 'placeholder-user-uuid-1234'
  };
  
  next();
};

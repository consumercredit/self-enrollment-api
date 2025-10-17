import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include profileId
declare global {
  namespace Express {
    interface Request {
      profileId?: number;
    }
  }
}

/**
 * Middleware to extract ProfileID from request headers or query parameters
 * This allows us to use dynamic ProfileIDs without changing all existing routes
 */
export const profileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Try to get ProfileID from various sources
    let profileId: number | undefined;

    // 1. Check request body
    if (req.body && req.body.profileId) {
      profileId = parseInt(req.body.profileId, 10);
    }

    // 2. Check query parameters
    if (!profileId && req.query.profileId) {
      profileId = parseInt(req.query.profileId as string, 10);
    }

    // 3. Check headers
    if (!profileId && req.headers['x-profile-id']) {
      profileId = parseInt(req.headers['x-profile-id'] as string, 10);
    }

    // 4. Require valid ProfileID - no fallbacks for financial data
    if (!profileId || isNaN(profileId)) {
      console.error('🚨 SECURITY: No valid ProfileID provided for financial data access');
      return res.status(401).json({ 
        error: 'Unauthorized: Valid ProfileID required for financial data access',
        details: 'User must be properly authenticated'
      });
    }

    // Add profileId to the request object
    req.profileId = profileId;

    //console.log(`Request to ${req.path} using ProfileID: ${profileId}`);
    next();
  } catch (error) {
    console.error('🚨 SECURITY: Profile middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication error',
      details: 'Unable to verify user identity'
    });
  }
};

/**
 * Helper function to get ProfileID from request (for use in route handlers)
 */
export const getProfileId = (req: Request): number => {
  if (!req.profileId) {
    throw new Error('🚨 SECURITY: No ProfileID available - user not properly authenticated');
  }
  return req.profileId;
};

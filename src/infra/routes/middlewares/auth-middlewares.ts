import { verifyJWT } from '@shared/security';
import { NextFunction, Request, Response } from 'express';

export function authUserJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provieded' });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: 'Token properties error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  verifyJWT(token, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalid' });
    }

    req.userId = decoded.id as string;

    return next();
  });
}

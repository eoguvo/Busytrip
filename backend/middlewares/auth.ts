import { NextFunction, Request, Response } from 'express';
import tokenService from '../services/token';

export async function authorizate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: 'No Token provided' });

  const parts = authHeader.split(' ');

  if (!(parts.length === 2))
    return res.status(401).send({ error: 'token error' });

  const [scheme, token] = parts;

  if (scheme !== 'Bearer')
    return res.status(401).send({ error: 'token malformated' });

  try {
    res.locals.user = await tokenService.verify(token);

    next();
  } catch (err) {
    res.status(401).json({ code: 'UNAUTHENTICATED', message: 'Invalid token' });
  }
}

export function hasPermission(req: Request, res: Response, next: NextFunction) {
  const { role } = req.body;
  const { id } = req.params || req.body;
  const user = res.locals.user;

  if (id != user.id && user.role !== 'ADMIN')
    return res.status(405).json({ error: 'Not allowed' });

  if (user.role !== 'ADMIN' && role)
    return res.status(405).json({ error: 'Not allowed' });

  next();
}

// https://stackoverflow.com/questions/35749833/typescript-function-taking-one-or-array-of-objects/35750134#answer-35750134
export function authorized(...allowedRoles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    !allowedRoles.includes(res.locals.user.role)
      ? res.status(405).json({ error: 'Not allowed' })
      : next();
  };
}

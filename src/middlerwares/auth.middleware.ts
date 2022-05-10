import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const SECRET = readFileSync('jwt.evaluation.key', 'utf8');

    const decoded = jwt.verify(token, SECRET);

    req.body = { ...req.body, decoded };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

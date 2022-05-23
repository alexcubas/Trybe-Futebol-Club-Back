import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

const jwtConfig = {
  expiresIn: '1y',
};

const SECRET = readFileSync('jwt.evaluation.key', 'utf8');

export default (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);

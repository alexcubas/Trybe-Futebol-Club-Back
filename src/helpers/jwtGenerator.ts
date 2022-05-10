import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

const jwtConfig = {
  expiresIn: '1d',
};

const SECRET = readFileSync('jwt.evaluation.key', 'utf8');

export default (data = {}) => jwt.sign({ data }, SECRET, jwtConfig);

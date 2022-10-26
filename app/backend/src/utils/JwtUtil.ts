import { sign } from 'jsonwebtoken';
import Token from '../interfaces/Token';

export default class JwtUtil implements Token {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'secret';
  }

  generateToken(payload: object) {
    return sign(payload, this.secret, { expiresIn: '12h' });
  }
}

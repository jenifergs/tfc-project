import { Request, Response } from 'express';
import Login from '../interfaces/Login';
import UserService from '../services/UserService';
import JwtUtil from '../utils/JwtUtil';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService(new JwtUtil());
  }

  async loginUser(req: Request<Login>, res: Response) {
    const { email, password } = req.body;
    console.log('email', email);
    console.log('password', password);

    try {
      const token = await this.service.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      const erroMapeado = error as Error;
      return res.status(401).json({ message: erroMapeado.message });
    }
  }

  async validateToken(req: Request, res: Response) {
    console.log('req.headers.authorization', req.headers.authorization);

    const token = req.headers.authorization;
    try {
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const role = await this.service.validateToken(token);
      return res.status(200).json({ role });
    } catch (error) {
      const erroMapeado = error as Error;
      return res.status(401).json({ message: erroMapeado.message });
    }
  }
}

import { Request, Response } from 'express';
import Login from '../interfaces/Login';
import UserService from '../services/UserService';
import JwtUtil from '../utils/JwtUtil';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService(new JwtUtil());
  }

  loginUser = async (req: Request<Login>, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await this.service.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      const erroMapeado = error as Error;
      return res.status(401).json({ message: erroMapeado.message });
    }
  };
}

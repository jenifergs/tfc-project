import { Request, Response, NextFunction } from 'express';
import Login from '../interfaces/Login';

const validatedPassword = (req: Request<Login>, res: Response, next: NextFunction) => {
  const { password } = req.body;
  console.log('password', password);
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validatedPassword;

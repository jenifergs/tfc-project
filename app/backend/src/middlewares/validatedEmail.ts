import { Request, Response, NextFunction } from 'express';
import Login from '../interfaces/Login';

const validatedEmail = (req: Request<Login>, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validatedEmail;

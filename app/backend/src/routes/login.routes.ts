import { Router } from 'express';
import UserController from '../controller/UserController';
import validatedUsername from '../middlewares/validatedEmail';
import validatedPassword from '../middlewares/validatedPassword';

const loginRouter = Router();
const loginUser = new UserController();
console.log('loginUser', loginUser);
// PROBLEMAS COM A CLASSE ENCONTRAR ELA MESMA
// https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin

loginRouter.post(
  '/login',
  validatedUsername,
  validatedPassword,
  loginUser.loginUser.bind(loginUser),
);
loginRouter.get('/login/validate', loginUser.validateToken.bind(loginUser));
export default loginRouter;

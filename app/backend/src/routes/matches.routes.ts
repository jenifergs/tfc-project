import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchRouter = Router();
const matches = new MatchesController();
// PROBLEMAS COM A CLASSE ENCONTRAR ELA MESMA
// https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin

matchRouter.get(
  '/matches',
  matches.getMatches.bind(matches),
);

export default matchRouter;

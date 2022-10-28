import { Router } from 'express';
import validatedToken from '../middlewares/validatedToken';
import MatchesController from '../controller/MatchesController';
import validatedTeam from '../middlewares/validatedTeam';

const matchRouter = Router();
const matches = new MatchesController();
// PROBLEMAS COM A CLASSE ENCONTRAR ELA MESMA
// https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin

matchRouter.get(
  '/matches',
  matches.getMatches.bind(matches),
);

matchRouter.post(
  '/matches',
  validatedToken,
  validatedTeam,
  matches.createMatch.bind(matches),
);

matchRouter.patch(
  '/matches/:id/finish',
  matches.finishMatch.bind(matches),
);

matchRouter.patch(
  '/matches/:id',
  matches.updateMatch.bind(matches),
);

export default matchRouter;

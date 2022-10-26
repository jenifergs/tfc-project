import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const TeamsRouter = Router();
const teams = new TeamsController();
// PROBLEMAS COM A CLASSE ENCONTRAR ELA MESMA
// https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin

TeamsRouter.get(
  '/teams',
  teams.getTeams.bind(teams),
);
export default TeamsRouter;

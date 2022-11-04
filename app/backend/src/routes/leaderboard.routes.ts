import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRouter = Router();
const leaderboard = new LeaderboardController();
// PROBLEMAS COM A CLASSE ENCONTRAR ELA MESMA
// https://stackoverflow.com/questions/50400776/node-js-es6-class-unable-to-call-class-method-from-within-class-method-when-usin
leaderboardRouter.get(
  '/leaderboard/home',
  leaderboard.getResultsHome.bind(leaderboard),
);

leaderboardRouter.get('/leaderboard/away', leaderboard.getResultsAway.bind(leaderboard));
leaderboardRouter.get('/leaderboard', leaderboard.getAllResults.bind(leaderboard));
export default leaderboardRouter;

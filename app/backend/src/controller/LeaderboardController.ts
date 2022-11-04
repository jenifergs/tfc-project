import { Request, Response } from 'express';
import LeaderboardService from '../services/LeadboardService';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  async getResultsHome(req: Request, res: Response) {
    const leaderboards = await this.service.getTeamHomeResults();
    return res.status(200).json(leaderboards);
  }

  async getResultsAway(req: Request, res: Response) {
    const leaderboards = await this.service.getTeamAwayResults();
    return res.status(200).json(leaderboards);
  }

  async getAllResults(req: Request, res: Response) {
    const leaderboards = await this.service.getAllTeamResults();
    return res.status(200).json(leaderboards);
  }
}

export default LeaderboardController;

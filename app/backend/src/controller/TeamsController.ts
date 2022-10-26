import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  public service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  async getTeams(req: Request, res: Response) {
    const teams = await this.service.getTeams();
    return res.status(200).json(teams);
  }
}

export default TeamsController;

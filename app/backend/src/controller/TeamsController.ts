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

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const team = await this.service.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamsController;

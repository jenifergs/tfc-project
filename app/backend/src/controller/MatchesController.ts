import { Request, Response } from 'express';
import ErrorUtil from '../utils/errorUtil';
import MatchService from '../services/MatchService';

class MatchesController {
  public service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await this.service.getMatchesInProgress(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await this.service.getMatches();
    return res.status(200).json(matches);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const match = await this.service
        .createMatch(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
      return res.status(201).json(match);
    } catch (error) {
      const erroMapeado = error as ErrorUtil;
      return res.status(erroMapeado.code).json({ message: erroMapeado.message });
    }
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    try {
      await this.service.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      const erroMapeado = error as Error;
      return res.status(400).json({ message: erroMapeado.message });
    }
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  }
}
export default MatchesController;

import { Request, Response } from 'express';
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
}
export default MatchesController;

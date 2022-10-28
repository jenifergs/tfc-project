import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchesController {
  public service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  async getMatches(req: Request, res: Response) {
    const matches = await this.service.getMatches();
    return res.status(200).json(matches);
  }
}
export default MatchesController;

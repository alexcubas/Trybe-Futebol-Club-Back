import { Request, Response } from 'express';
import MatchService from '../service/matchService';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async gamesInMatchOrNot(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const { code, data } = await this.matchService.games();

      return res.status(code).json(data);
    }

    const trueOrFalse = inProgress === 'true';

    const { code, data } = await this.matchService.gameInMatch(trueOrFalse);

    return res.status(code).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { code, data } = await this.matchService.createMatch(req.body);

    return res.status(code).json(data);
  }

  async finishGame(req: Request, res: Response) {
    const { id } = req.params;

    const { code, data } = await this.matchService.finishGame(id);

    return res.status(code).json(data);
  }

  async changeGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { code, data } = await this.matchService.changeGoals(id, homeTeamGoals, awayTeamGoals);

    return res.status(code).json(data);
  }
}

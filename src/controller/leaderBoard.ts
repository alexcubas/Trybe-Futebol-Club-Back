import { Request, Response } from 'express';
import ClassServiceHome from '../service/leaderBoardServiceHome';
import ClassServiceAway from '../service/leaderBoardServiceAway';

export default class MatchController {
  private classServiceHome: ClassServiceHome;

  private classServiceAway: ClassServiceAway;

  constructor() {
    this.classServiceHome = new ClassServiceHome();
    this.classServiceAway = new ClassServiceAway();
  }

  async classificacaoHome(req: Request, res: Response) {
    const { code, data } = await this.classServiceHome.classificacao();

    return res.status(code).json(data);
  }

  async classificacaoAway(req: Request, res: Response) {
    const { code, data } = await this.classServiceAway.classificacao();

    return res.status(code).json(data);
  }

  async classificacao(req: Request, res: Response) {
    const home = await this.classServiceHome.classificacao();
    const away = await this.classServiceAway.classificacao();

    const { code, data } = await this.classServiceHome.classificacaoGeral(home.data, away.data);

    return res.status(code).json(data);
  }
}

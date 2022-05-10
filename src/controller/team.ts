import { Request, Response } from 'express';
import TeamService from '../service/teamService';

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  async team(_req: Request, res: Response) {
    const { code, data } = await this.teamService.time();

    return res.status(code).json(data);
  }

  async teamById(req: Request, res: Response) {
    const { id } = req.params;

    const { code, data } = await this.teamService.timeId(id);

    return res.status(code).json(data);
  }

  // async role(req: Request, res: Response) {
  //   const { decoded } = req.body;

  //   const { code, data } = await this.userService.role(decoded);

  //   return res.status(code).json(data);
  // }
}

import { Request, Response } from 'express';
import UserService from '../service/userService';

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response) {
    const { code, data } = await this.userService.login(req.body);

    return res.status(code).json(data);
  }

  async role(req: Request, res: Response) {
    const { decoded } = req.body;

    const { code, data } = await this.userService.role(decoded);

    return res.status(code).json(data);
  }
}

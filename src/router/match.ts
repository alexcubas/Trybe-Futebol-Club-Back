import { Request, Response, Router } from 'express';
import MatchController from '../controller/match';
// import validate from '../middlerwares/valid';
import auth from '../middlerwares/auth.middleware';
// import userjoi from '../joi/userSchema';

const matchController = new MatchController();

const userRouter = Router();

userRouter.patch(
  '/:id/finish',
  async (req: Request, res: Response) => {
    await matchController.finishGame(req, res);
  },
);

userRouter.patch(
  '/:id',
  async (req: Request, res: Response) => {
    await matchController.changeGoals(req, res);
  },
);

userRouter.get(
  '/',
  // auth,
  async (req: Request, res: Response) => {
    await matchController.gamesInMatchOrNot(req, res);
  },
);

userRouter.post(
  '/',
  auth,
  async (req: Request, res: Response) => {
    await matchController.createMatch(req, res);
  },
);

export default userRouter;

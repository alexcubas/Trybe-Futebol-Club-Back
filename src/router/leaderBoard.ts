import { Request, Response, Router } from 'express';
import ClassController from '../controller/leaderBoard';
// import validate from '../middlerwares/valid';
// import auth from '../middlerwares/auth.middleware';
// import userjoi from '../joi/userSchema';

const classController = new ClassController();

const userRouter = Router();

userRouter.get(
  '/',
  // auth,
  async (req: Request, res: Response) => {
    await classController.classificacao(req, res);
  },
);

userRouter.get(
  '/home',
  // auth,
  async (req: Request, res: Response) => {
    await classController.classificacaoHome(req, res);
  },
);

userRouter.get(
  '/away',
  // auth,
  async (req: Request, res: Response) => {
    await classController.classificacaoAway(req, res);
  },
);

export default userRouter;

import { Request, Response, Router } from 'express';
import UserController from '../controller/user';
import validate from '../middlerwares/valid';
import auth from '../middlerwares/auth.middleware';
import userjoi from '../joi/userSchema';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  validate(userjoi),
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  },
);

userRouter.get(
  '/validate',
  auth,
  async (req: Request, res: Response) => {
    await userController.role(req, res);
  },
);

export default userRouter;

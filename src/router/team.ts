import { Request, Response, Router } from 'express';
import TeamController from '../controller/team';
// import validate from '../middlerwares/valid';
// import auth from '../middlerwares/auth.middleware';
// import userjoi from '../joi/userSchema';

const teamController = new TeamController();

const userRouter = Router();

// userRouter.post(
//   '/',
//   validate(userjoi),
//   async (req: Request, res: Response) => {
//     await userController.login(req, res);
//   },
// );

userRouter.get(
  '/:id',
  // auth,
  async (req: Request, res: Response) => {
    await teamController.teamById(req, res);
  },
);

userRouter.get(
  '/',
  // auth,
  async (req: Request, res: Response) => {
    await teamController.team(req, res);
  },
);

export default userRouter;

import * as bcryptjs from 'bcryptjs';
import IUser from '../interfaces/user';
import Users from '../database/models/users';
import token from '../helpers/jwtGenerator';

export default class UserService {
  constructor(private user = Users) {}

  async login({ email, password }: IUser) {
    const result = await this.user.findOne({ where: { email } });

    if (!result) { return { code: 401, data: { message: 'Incorrect email or password' } }; }

    const valid = await bcryptjs.compare(password, result.password);

    if (!valid) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    const token1 = token(result.role);

    const user = {
      id: result.id,
      username: result.username,
      role: result.role,
      email: result.email,
    };

    return { code: 200,
      data: {
        user,
        token: token1,
      } };
  }

  async role(decoded: { data: string }) {
    console.log(this.user.findAll());
    return { code: 200, data: decoded.data };
  }
}

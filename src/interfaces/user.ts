export default interface IUser {
  email: string;
  password: string;
}

interface IuserReturn {
  user: {
    id: number
    username: string
    role: string
    email: string
  },
  token: string
}

export {
  IuserReturn,
};

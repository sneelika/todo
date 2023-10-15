export interface IUser {
  email: string;
  name: string;
  password: string;
}

interface IAuthenticatedUser {
  email: string;
  name: string;
}

interface IUserGlobalStore {
  user: IAuthenticatedUser | null;
}

import { Roles } from './config';

declare global {
  declare namespace Express {
    export interface Request {
      user: {
        _id: string;
        name: string;
        email: string;
        Roles: Roles;
      };

      route: {
        path: string;
      }
    }
  }
}

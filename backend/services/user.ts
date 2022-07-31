import { ROLES } from './../config/index';
import crypto from './crypto';
import UserModel from '../database/models/user';
import R from 'ramda'; 
import tokenService from './token';
import { IUser } from '../interfaces/user';

export class UserService {
  db;
  userRole = -1;
  constructor() {
    this.db = UserModel;
    this.userRole = ROLES.COMPANY;
  }
  
  async GetAll() {
    const companies = await this.db.find({ role: this.userRole }).lean<IUser[]>();
    return this.SerializeUser(companies);
  }

  async GetById(id: string) {
    if (!id) throw new Error('Selecione um id');
    const user = await this.db.findById(id).lean<IUser>();
    return this.SerializeUser([user]) as IUser;
  }

  async Create(_user: IUser) {
    try {
      const userCount = await this.db.count({ email: _user.email });
      if(userCount !== 0) throw { statusCode: 400, message: "Usuário já existe" }
      
      const hash: string = await crypto.hash(_user.password!);
      const { _doc: data } = await this.db.create({
        ..._user,
        password: hash,
        role: ROLES.USER
      });

      const token = tokenService.sign({ id: data._id, role: data.role });
      const user = this.SerializeUser([data]);

      return {
        user,
        token,
      };
    } catch (e) {
      throw e;
    }
  }

  async Update(id: string, body: IUser) {
    if (!id) throw new Error('Selecione um id');
    return await this.db.findByIdAndUpdate(id, body);
  }

  async FindByEmail(email: string) {
    return await this.db.findOne({ email });
  }

  private SerializeUser(user: IUser[]): IUser | IUser[] {
    const serializedUser: IUser[] = user.map(R.omit(['password']));
    return serializedUser.length === 1
      ? serializedUser[0]
      : serializedUser;
  }
}
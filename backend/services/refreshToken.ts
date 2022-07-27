import { v4 as uuidv4 } from 'uuid';
import { IRefreshToken } from './../interfaces/token';
import RefreshTokenModel from './../database/models/refreshToken';
import UserModel from './../database/models/user';
import { crypto } from '../config';
import { ICompany } from '../interfaces/company';

interface IOldToken {
  refreshtokens: IRefreshToken,
  users: ICompany
}

export class RefreshTokenService {
  db;
  users;
  constructor() {
    this.db = RefreshTokenModel;
    this.users = UserModel;
  }

  async create({ _id }: { _id: String }) {
    let expiredAt = new Date();

    expiredAt = new Date(expiredAt.getTime() + crypto.jwtRefreshExpiration);

    const token = uuidv4();

    await this.db.create({
      token,
      user_id: _id,
      expiryDate: expiredAt.getTime(),
    });

    return token;
  }

  revoke(token: string) {
    const tokenObj = this.db.findOneAndDelete({ token });
    return tokenObj;
  }

  generateTokenCookie(token: string) {
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + crypto.jwtRefreshExpiration),
    };
    return { token, cookieOptions };
  }

  async get(token: string) {
    // muita magica esta prestes a acontecer
    
    const [oldToken,] = await this.db.find<IRefreshToken>({ token });
    const user = await this.users.findById(oldToken.user_id);
    if (!oldToken) throw new Error('Sessão inválida');

    const isExpired = oldToken.expiryDate.getTime() < new Date().getTime();
    if (isExpired) throw new Error('Sessão expirada');

    return {...oldToken, user};
  }
}

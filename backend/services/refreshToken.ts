import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';
import { IRefreshToken } from './../interfaces/token';
import RefreshTokenModel from './../database/models/refreshToken';
import { crypto } from '../config';
import { ICompany } from './../interfaces/company';

export class RefreshTokenService {
  db;
  constructor() {
    this.db = RefreshTokenModel;
  }

  async create({ _id }: { _id: String }) {
    let expiredAt = new Date();

    expiredAt = new Date(expiredAt.getTime() + crypto.jwtRefreshExpiration);

    const token = uuidv4();

    await this.db.create({
      token,
      company: _id,
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
    return cookie.serialize('refreshToken', token, cookieOptions);
  }

  async get(token: string) {
    const oldToken = await this.db.findOne({ token }).populate('company');
    if (!oldToken) throw new Error('Sessão inválida');

    const isExpired = oldToken.expiryDate.getTime() < new Date().getTime();
    if (isExpired) throw new Error('Sessão expirada');

    return oldToken;
  }
}

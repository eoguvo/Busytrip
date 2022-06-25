import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenInterface } from './../interfaces/token';

import { crypto as config } from '../config';

const signOptions: SignOptions = {
  algorithm: 'RS256',
  expiresIn: '1d',
};

const sign = (payload: TokenInterface) =>
  jwt.sign(payload, config.jwt.privateKey, signOptions);

const verify = (token: string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, config.jwt.publicKey, (error, data) =>
      error ? reject(error) : resolve(data)
    )
  );

export default {
  sign,
  verify,
};

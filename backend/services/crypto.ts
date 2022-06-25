import bcrypt from 'bcrypt';
import { crypto as config } from '../config';

class Crypto {
  static hash = (value: string) => bcrypt.hash(value, config.hashSaltRounds);

  static compare = (value: string, hash: string) => bcrypt.compare(value, hash);
}

export default Crypto;

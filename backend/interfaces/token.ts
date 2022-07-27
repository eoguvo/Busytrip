export interface TokenInterface {
  role: string;
  id: string;
}

export interface IRefreshToken {
  _id: string;
  token: string;
  user_id: string;
  expiryDate: Date;
}

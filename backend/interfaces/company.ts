export interface ICompany {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone: number;
  bio: string;
  avatar_url: string;
  techs: [string];
  role: string;
  location: {
    type: 'Point'
  };
}

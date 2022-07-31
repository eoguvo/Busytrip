export interface ICompany {
  _id: string,
  name: string,
  email: string,
  phone: string,
  bio: string,
  avatar_url: string,
  tags: string[],
  role: string,
  ratings: number,
  cover: string,
  location: {
    coordinates: [number, number]
  }
}
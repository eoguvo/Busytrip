export interface CardProps {
  avatar_url: string, 
  name: string, 
  bio: string, 
  location: {
    coordinates: Number[]
  }
  favorite: string[],
  setFavorites: Function,
  id: string
}
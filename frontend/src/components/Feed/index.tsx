import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePosition } from '../../hooks/usePosition';
import api from '../../services/api';
import { getDistanceBetweenTwoPoints } from '../../services/distanceBetweenPoints';
import { parseCompanies } from '../../services/parseCompanies';
import Card from './Card';
import { ICompany } from './interface';
import { Timeline } from "./styles";

const timelineVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
  }
}

const fetchCompanies = async (): Promise<ICompany[]> => {
  const response = await api.get<ICompany[]>('/company');
  return response.data;
}

const formatLocation = (coordinates: number[]) => {
  return { latitude: coordinates[0], longitude: coordinates[1] }
}

function Feed() {
  const { latitude, longitude, error: geoLocationError } = usePosition();
  const { data: companies } = useQuery(['Companies'], fetchCompanies);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const [favoritesCompanies, restCompanies]
    = companies?.length ? parseCompanies(companies, favorites)
      : [[], []]

  if (geoLocationError) {
    toast.error("Por favor, ligue a localização", {
      id: 'GeoLocationError'
    });
  }

  if(companies && companies?.length > 0) return (
      <Timeline variants={timelineVariants} initial="hidden" animate="show" exit="exit" layout>
        <AnimatePresence>
          {favoritesCompanies?.map(({ avatar_url, bio, name, location, _id, ratings }) => {
            return <Card
              setFavorites={setFavorites}
              avatar_url={avatar_url} bio={bio}
              name={name}
              location={location}
              distance={
                geoLocationError
                  ? 0
                  : getDistanceBetweenTwoPoints(
                    formatLocation(location.coordinates),
                    formatLocation([latitude, longitude]))
              }
              key={_id}
              id={`${_id}`}
              favorite={favorites}
              ratings={ratings}
            />
          })}

          {restCompanies?.map(({ avatar_url, bio, name, location, _id, ratings }) => {
            return <Card
              setFavorites={setFavorites}
              avatar_url={avatar_url} bio={bio}
              name={name}
              location={location}
              distance={
                getDistanceBetweenTwoPoints(
                  formatLocation(location.coordinates),
                  formatLocation([latitude, longitude]))
              }
              favorite={favorites}
              ratings={ratings}
              key={_id}
              id={_id}
            />
          })}
        </AnimatePresence>
      </Timeline>
  );
}

export default Feed;
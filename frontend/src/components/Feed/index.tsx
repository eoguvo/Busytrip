import { useQuery } from '@tanstack/react-query';
import { lazy, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePosition } from '../../hooks/usePosition';
import api from '../../services/api';
import { getDistanceBetweenTwoPoints } from '../../services/distanceBetweenPoints';
import { parseCompanies } from '../../services/parseCompanies';
const Card = lazy(() => import('./Card'));
import { ICompany } from './interface';
import { Timeline } from "./styles";

interface ParsedCompanies {
  favoritesCompanies: ICompany[], 
  restCompanies: ICompany[]
}

const fetchCompanies = async () => {
  const response = await api.get<ICompany[]>('/company');
  return response.data;
}

const formatLocation = (coordinates: number[]) => {
  return { latitude: coordinates[0], longitude: coordinates[1] }
}

function Feed() {
  const { latitude, longitude, error: geoLocationError } = usePosition();
  const { data: companies, isFetching, error } = useQuery(['Companies'], fetchCompanies);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [parsedCompanies, setParsedCompanies] = useState<ParsedCompanies>({
    favoritesCompanies: [], 
    restCompanies: []
  });

  useEffect(()=> {
    if(!companies) return;
    const [favoritesCompanies, restCompanies] 
      = parseCompanies(companies, favorites)
    setParsedCompanies({ favoritesCompanies, restCompanies })
  }, [companies, favorites])

  if(geoLocationError) {
    toast.error("Por favor, ligue a localização", {
      id: 'GeoLocationError'
    });
  }

  return (
    <Timeline>
      {isFetching && <Skeleton count={4} />}
      {parsedCompanies.favoritesCompanies?.map(({ avatar_url, bio, name, location, _id, ratings }) => {
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
        id={_id}
        favorite={favorites} 
        ratings={ratings}
        />
      })}
      
      {parsedCompanies.restCompanies?.map(({ avatar_url, bio, name, location, _id, ratings }) => {
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
    </Timeline>
  );
}

export default Feed;
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {useLocalStorage} from '../../hooks/useLocalStorage';
import Card from "./Card";
import { ICompany } from './interface';
import { Timeline } from "./styles";

const fetchCompanies = async () => {
  const response = await axios.get<ICompany[]>('http://localhost:8080/company');
  return response.data;
}

function Feed() {
  const { data: companies, isFetching, error } = useQuery(['Companies'], fetchCompanies);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  if(isFetching) return <h1>Loading</h1>
  return (
    <Timeline>
      {companies?.map(({ avatar_url, bio, name, location, _id }) => {
        return <Card 
        setFavorites={setFavorites} 
        avatar_url={avatar_url} bio={bio} 
        name={name} 
        location={location} 
        key={_id} 
        id={_id}
        favorite={favorites} 
        />
      })}
    </Timeline>
  );
}

export default Feed;
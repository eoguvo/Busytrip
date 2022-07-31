import { useState, useEffect } from 'react';

interface Coordinates {
  coords: Props
}

interface Props {
  latitude: number,
  longitude: number
}

export const usePosition = () => {
  const [position, setPosition] = useState<Props>({} as Props);
  const [error, setError] = useState('');

  const onChange = ({ coords }: Coordinates) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
}
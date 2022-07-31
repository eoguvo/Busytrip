import { ReactNode } from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import { MapWrapper } from './styles';
import 'leaflet/dist/leaflet.css';

import { icon } from 'leaflet';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = icon({
  iconUrl: markerIcon,
  shadowUrl: iconShadow,
});

interface MapProps {
  position: [number, number];
  children: ReactNode
}

export default function Map({ position, children }: MapProps) {
  return (
    <MapWrapper center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={DefaultIcon} position={position}>
        <Popup>
          {children} <br />
          <a href={`https://maps.google.com/?q=${position[0]},${position[1]}`} target="_blank" >
            Google maps
          </a>
        </Popup>
      </Marker>
    </MapWrapper>
  );
} 
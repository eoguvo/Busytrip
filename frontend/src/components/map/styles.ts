import styled from "styled-components";
import { MapContainer } from 'react-leaflet'

export const MapWrapper = styled(MapContainer)`
  height: 100%;
  min-height: 500px;
  z-index: 2;
`;
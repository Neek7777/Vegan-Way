import React from 'react';
import { Map } from './Map';

export const MapPage = () => {
  const handleMarkerClick = () => {
    console.log('click!');
  };
  return <Map isMarkerShown={true} onMarkerClick={handleMarkerClick} />;
};

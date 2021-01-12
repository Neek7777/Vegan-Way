import React from 'react';
import { NearMap } from './NearMap';

export const MainPage = () => {
  const handleMarkerClick = () => {
    console.log('click!');
  };
  return <NearMap isMarkerShown={true} onMarkerClick={handleMarkerClick} />;
};

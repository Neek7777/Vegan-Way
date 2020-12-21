import React, { useState, useEffect, useRef } from 'react';
require('dotenv').config()
export default function MapPage({ options, onMount, className, onMountProps }) {
  const ref = useRef();
  const [map, setMap] = useState();
  useEffect(() => {
    const onLoad = () =>
      setMap(new window.google.maps.Map(ref.current, options));
    if (!window.google) {
      const script = document.createElement(`script`);
      
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` + process.env.REACT_APP_API_KEY;
      document.head.append(script);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  }, [options]);
  if (map && typeof onMount === `function`) onMount(map, onMountProps);
  return (
    <div
      style={{ height: `60vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  );
}
MapPage.defaultProps = {
  options: {
    center: { lat: 60, lng: 108 },
    zoom: 4,
  },
};

import React, { useEffect } from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import markerIcon from '../../icons/broccoli/broccoli.png';
import myMarkerIcon from '../../icons/crown/crown.png';
import './Map.css';
require('dotenv').config();

export const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=
      ${process.env.REACT_APP_API_KEY}&libraries=places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState('places', 'updatePlaces', ''),
  withState('selectedPlace', 'updateSelectedPlace', null),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      fetchPlaces: ({ updatePlaces }) => () => {
        const bounds = refs.map.getBounds();
        const service = new window.google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );
        const request = {
          bounds: bounds,
          keyword: ['Веган'],
          type: ['establishment', 'food', 'cafe', 'restaurant'],
        };
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            updatePlaces(results);
          }
        });
      },
      onToggleOpen: ({ updateSelectedPlace }) => (key) => {
        updateSelectedPlace(key);
      },
    };
  })
)((props) => {
  const [position, setPosition] = React.useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        console.log('lat:', coords.latitude, 'lng:', coords.longitude);
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    position && (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={position}
        onTilesLoaded={props.fetchPlaces}
        ref={props.onMapMounted}
        onBoundsChanged={props.fetchPlaces}
      >
        {props.isMarkerShown && (
          <>
            <Marker
              position={position}
              onClick={props.onMarkerClick}
              icon={{ url: myMarkerIcon }}
              title="Это я, такой весь голодный( Брр...."
            />
            {props.places &&
              props.places.map(
                ({ geometry, name, rating, vicinity, photos, place_id }) => {
                  return (
                    <Marker
                      position={geometry.location}
                      onClick={() => props.onToggleOpen(place_id)}
                      icon={{ url: markerIcon }}
                      title={`${name}, Рейтинг: ${rating}`}
                      key={name}
                    >
                      {props.selectedPlace === place_id && (
                        <InfoWindow
                          onCloseClick={() => props.onToggleOpen()}
                          className={'InfoWindow'}
                          // options={{ maxWidth: 200 }}
                        >
                          <>
                            <div>{name}</div>
                            <div>{rating}</div>
                            <div>{vicinity}</div>
                            {photos && photos.length && (
                              <img
                                className={'previewImage'}
                                src={photos[0].getUrl()}
                                alt="text"
                              />
                            )}
                          </>
                        </InfoWindow>
                      )}
                    </Marker>
                  );
                }
              )}
          </>
        )}
      </GoogleMap>
    )
  );
});

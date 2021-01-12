import React, { useEffect } from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { Rate, Divider } from 'antd';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import markerIcon from '../../icons/broccoli/broccoli.png';
import myMarkerIcon from '../../icons/crown/crown.png';
import { useMessage } from '../../hooks/message.hooks';
import './MapPage.css';
require('dotenv').config();

export const MapPage = compose(
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
          keyword: ['вегетарианский', 'вег', 'vegeterian'],
          type: ['establishment', 'food', 'cafe', 'restaurant'],
        };
        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
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
  const {
    fetchPlaces,
    onMapMounted,
    places,
    onToggleOpen,
    selectedPlace,
  } = props;

  const message = useMessage();
  const [position, setPosition] = React.useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
      },
      (error) => message(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    position && (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={position}
        onTilesLoaded={fetchPlaces}
        ref={onMapMounted}
        onBoundsChanged={fetchPlaces}
      >
        <>
          <Marker
            position={position}
            icon={{ url: myMarkerIcon }}
            title="Это я, такой весь голодный( Брр...."
          />
          {places &&
            places.map(
              ({ geometry, name, rating, vicinity, photos, place_id }) => {
                return (
                  <Marker
                    position={geometry.location}
                    onClick={() => onToggleOpen(place_id)}
                    icon={{ url: markerIcon }}
                    title={`${name}, Рейтинг: ${rating}`}
                    key={place_id}
                  >
                    {selectedPlace === place_id && (
                      <InfoWindow onCloseClick={() => onToggleOpen()}>
                        <div className="infoWindow">
                          <Divider className="cardTitle">{name}</Divider>
                          <Rate disabled defaultValue={rating} />
                          <div className="cardDescription">{`Адрес: ${vicinity}`}</div>
                          {photos && photos.length && (
                            <img
                              className={'previewImage'}
                              src={photos[0].getUrl()}
                              alt={name}
                            />
                          )}
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                );
              }
            )}
        </>
      </GoogleMap>
    )
  );
});

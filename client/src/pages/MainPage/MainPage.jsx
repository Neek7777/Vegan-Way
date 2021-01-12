import React, { useEffect } from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { Rate, Divider } from 'antd';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from 'react-google-maps';
import markerIcon from '../../icons/broccoli/broccoli.png';
import myMarkerIcon from '../../icons/crown/crown.png';
import { useMessage } from '../../hooks/message.hooks';
import './MainPage.css';
require('dotenv').config();

export const MainPage = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=
      ${process.env.REACT_APP_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState('nearPlace', 'updateNearPlace'),
  withState('bestPlace', 'updateBestPlace'),
  withState('selectedPlace', 'updateSelectedPlace', null),
  withState('position', 'setPosition'),
  withState('direction', 'setDirection'),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => (ref) => {
        refs.map = ref;
      },
      fetchPlaces: ({
        updateNearPlace,
        position,
        nearPlace,
        setDirection,
      }) => () => {
        const service = new window.google.maps.places.PlacesService(
          refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        );

        const request = {
          location: position,
          keyword: ['вегетарианский', 'вег', 'vegeterian'],
          type: ['establishment', 'food', 'cafe', 'restaurant'],
          rankBy: window.google.maps.places.RankBy.DISTANCE,
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            updateNearPlace(results[0]);
          }
        });

        if (nearPlace) {
          const DirectionsService = new window.google.maps.DirectionsService();

          DirectionsService.route(
            {
              origin: position,
              destination: {
                lat: nearPlace.geometry.location.lat(),
                lng: nearPlace.geometry.location.lng(),
              },
              travelMode: window.google.maps.TravelMode.WALKING,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirection(result);
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
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
    direction,
    nearPlace,
    onToggleOpen,
    selectedPlace,
  } = props;
  
  const message = useMessage();
  const [position, setPosition] = React.useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        props.setPosition({ lat: coords.latitude, lng: coords.longitude });
      },
      (error) => message(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    position && (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={position}
        onTilesLoaded={fetchPlaces}
        ref={onMapMounted}
        onBoundsChanged={fetchPlaces}
      >
        {direction && (
          <DirectionsRenderer
            directions={direction}
            options={{ suppressMarkers: true, preserveViewport: true }}
          />
        )}
        <>
          <Marker
            position={position}
            icon={{ url: myMarkerIcon }}
            title="Это я, такой весь голодный( Брр...."
          />
          {nearPlace && (
            <Marker
              position={nearPlace.geometry.location}
              onClick={() => onToggleOpen(nearPlace.place_id)}
              icon={{ url: markerIcon }}
              title={`${nearPlace.name}, Рейтинг: ${nearPlace.rating}`}
            >
              {selectedPlace === nearPlace.place_id && (
                <InfoWindow
                  onCloseClick={() => onToggleOpen()}
                  className={'InfoWindow'}
                >
                  <>
                    <Divider className="cardTitle">{nearPlace.name}</Divider>
                    <Rate disabled defaultValue={nearPlace.rating} />
                    <div className="cardDescription">{`Адрес: ${nearPlace.vicinity}`}</div>
                    {nearPlace.photos && nearPlace.photos.length && (
                      <img
                        className={'previewImage'}
                        src={nearPlace.photos[0].getUrl()}
                        alt="place"
                      />
                    )}
                  </>
                </InfoWindow>
              )}
            </Marker>
          )}
        </>
      </GoogleMap>
    )
  );
});

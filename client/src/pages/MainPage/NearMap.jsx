import React, { useEffect } from 'react';
import { compose, withProps, withState, withHandlers } from 'recompose';
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
require('dotenv').config();

export const NearMap = compose(
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
  const [position, setPosition] = React.useState(null);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        props.setPosition({ lat: coords.latitude, lng: coords.longitude });
        // setPosition({ lat: 47.222515, lng: 39.717362 });
        // props.setPosition({ lat: 47.222521, lng: 39.717362 });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    position && (
      <GoogleMap
        defaultZoom={18}
        defaultCenter={position}
        onTilesLoaded={props.fetchPlaces}
        ref={props.onMapMounted}
        onBoundsChanged={props.fetchPlaces}
      >
        {props.direction && (
          <DirectionsRenderer
            directions={props.direction}
            options={{ suppressMarkers: true, preserveViewport: true }}
          />
        )}
        {props.isMarkerShown && (
          <>
            <Marker
              position={position}
              onClick={props.onMarkerClick}
              icon={{ url: myMarkerIcon }}
              title="Это я, такой весь голодный( Брр...."
            />
            {props.nearPlace && (
              <Marker
                position={props.nearPlace.geometry.location}
                onClick={() => props.onToggleOpen(props.nearPlace.place_id)}
                icon={{ url: markerIcon }}
                title={`${props.nearPlace.name}, Рейтинг: ${props.nearPlace.rating}`}
              >
                {props.selectedPlace === props.nearPlace.place_id && (
                  <InfoWindow
                    onCloseClick={() => props.onToggleOpen()}
                    className={'InfoWindow'}
                    // options={{ maxWidth: 200 }}
                  >
                    <>
                      <div>{props.nearPlace.name}</div>
                      <div>{`Рейтинг: ${props.nearPlace.rating}`}</div>
                      <div>{`Адрес: ${props.nearPlace.vicinity}`}</div>
                      {props.nearPlace.photos &&
                        props.nearPlace.photos.length && (
                          <img
                            className={'previewImage'}
                            src={props.nearPlace.photos[0].getUrl()}
                            alt="text"
                          />
                        )}
                    </>
                  </InfoWindow>
                )}
              </Marker>
            )}
          </>
        )}
      </GoogleMap>
    )
  );
});

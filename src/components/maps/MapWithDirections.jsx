import React, { useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const MapWithDirections = ({ origin, destination }) => {
  const [mapLoaded, setMapLoaded] = useState(!!window.google);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const onLoad = (map) => {
    setMap(map);
    setMapLoaded(true);
  };

  const directionsCallback = (response, status) => {
    if (status === 'OK') {
      setDirections(response);
    } else {
      console.error('Directions request failed due to ' + status);
    }
  };

  return (
    mapLoaded && (
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={origin}
        onLoad={onLoad}
        options={{ 
          draggable: true, 
          zoomControl: true, 
          scrollwheel: true,
          disableDefaultUI: true, 
          zoomControlOptions: { 
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM 
          },
          minZoom: 2, 
          maxZoom: 18 
        }}
      >
        

        {directions && (
          <DirectionsRenderer directions={directions} />
        )}

        <DirectionsService
          options={{ 
            destination: destination,
            origin: origin,
            travelMode: 'DRIVING'
          }}
          callback={directionsCallback}
        />
      </GoogleMap>
    )
  );
};

export default MapWithDirections;

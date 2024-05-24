import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapWithMarkerSelector = ({ onMarkerSelect }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      setIsScriptLoaded(true);
    }
  }, [isScriptLoaded]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        onMarkerSelect({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error obtaining user location:', error);
      }
    );
  }, [onMarkerSelect]);

  const handleMapClick = (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    onMarkerSelect({ lat: clickedLat, lng: clickedLng });
  };

  return (
    <div>
     
        <GoogleMap
          mapContainerStyle={{
            height: "400px",
            width: "100%"
          }}
          zoom={12}
          center={userLocation}
          onClick={handleMapClick}
        >
          {userLocation && (
            <Marker
              position={userLocation}
            />
          )}
        </GoogleMap>
    </div>
  );
};

export default MapWithMarkerSelector;

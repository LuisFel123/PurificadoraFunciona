import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './mapa.css'; 
const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const Map = ({ onSelectLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlwND26rvK2XZKvqBhHI_h9xV_iHy72_8", // Reemplaza "YOUR_API_KEY_HERE" con tu clave de API de Google Maps
    libraries,
  });

  const [marker, setMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  // Función para obtener la ubicación actual del usuario
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter({ lat: latitude, lng: longitude });
        setMarker({ lat: latitude, lng: longitude }); // Centrar el marcador en la ubicación actual del usuario
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation(); // Obtener la ubicación actual del usuario al cargar el componente
  }, []);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
  }, []);

  const handleConfirmLocation = () => {
    if (marker) {
      onSelectLocation(marker);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
    <GoogleMap
      mapContainerClassName="map-container" // Aplica la clase CSS al contenedor del mapa
      zoom={15}
      center={center}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
    <button className="confirm-button" onClick={handleConfirmLocation}>Confirmar ubicación</button> 
  </div>
  );
};

export default Map;

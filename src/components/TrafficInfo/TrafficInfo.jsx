import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const TrafficInfo = ({ originLat, originLng, destinationLat, destinationLng }) => {
  const [trafficDuration, setTrafficDuration] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrafficInfo = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDlwND26rvK2XZKvqBhHI_h9xV_iHy72_8',
        version: '3', // Use version '3' for a stable release
      });

      try {
        await loader.load();
        const directionsService = new google.maps.DirectionsService();

        const origin = new google.maps.LatLng(parseFloat(originLat), parseFloat(originLng));
        const destination = new google.maps.LatLng(parseFloat(destinationLat), parseFloat(destinationLng));

        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date(),
              trafficModel: 'bestguess',
            },
          },
          (response, status) => {
            if (status === 'OK') {
              const route = response.routes[0].legs[0];
              setTrafficDuration(route.duration_in_traffic.text);
            } else {
              setError('Directions request failed due to ' + status);
            }
          }
        );
      } catch (e) {
        setError('Failed to load Google Maps API');
      }
    };

    fetchTrafficInfo();
  }, [originLat, originLng, destinationLat, destinationLng]);

  return (
    <div>
      {trafficDuration ? (
        <div>Traffic Duration: {trafficDuration}</div>
      ) : (
        <div>{error || 'Loading traffic info...'}</div>
      )}
    </div>
  );
};

export default TrafficInfo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherInfo.css'; // Importar el archivo de estilos CSS

const WeatherInfo = ({ lat, lng }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = 'f609364c7e334282844161918240306'; // Reemplaza con tu clave de API de WeatherAPI

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}&aqi=no`);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    if (lat && lng) {
      fetchWeather();
    }
  }, [lat, lng, apiKey]);

  if (!weather) {
    return <div className="weather-info">Cargando el clima...</div>;
  }

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'partly cloudy':
      case 'cloudy':
        return '🌤️';
      case 'rain':
      case 'light rain':
      case 'showers':
        return '🌧️';
      default:
        return '❓';
    }
  };

  return (
    <div className="weather-info">
     
      <div className="weather-details">
      <p>Clima: </p>
        <div className="weather-icon">{getWeatherIcon(weather.current.condition.text)}</div>
        <ul>
          <li>
            <div className="temperature">
            
              <span role="img" aria-label="thermometer">🌡️</span>
              {weather.current.temp_c} °C
            </div>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default WeatherInfo;

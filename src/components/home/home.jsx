import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import Navbar from "../menu/menu";
import './home.css'; // Importa el archivo de estilos CSS
import MapWithDirections from '../maps/MapWithDirections';
import TrafficInfo from '../TrafficInfo/TrafficInfo'; // Asegúrate de importar el componente TrafficInfo
import { LoadScript } from '@react-google-maps/api';
import WeatherInfo from '../WeatherInfo/WeatherInfo'; // Asegúrate de importar el componente WeatherInfo
function Home() {
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [driverPage, setDriverPage] = useState(1);
  const [routePage, setRoutePage] = useState(1);
  const driversPerPage = 4;
  const routesPerPage = 4;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getCar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Drivers:', data); // Verificar los datos recibidos
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/routes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Routes:', data); // Verificar los datos recibidos
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchDrivers();
    fetchRoutes();
  }, []);

  // Función para manejar el cambio de página de los conductores
  const handleDriverPageChange = (event, pageNumber) => {
    setDriverPage(pageNumber);
  };

  // Función para manejar el cambio de página de las rutas
  const handleRoutePageChange = (event, pageNumber) => {
    setRoutePage(pageNumber);
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="content-container scroll-container">
        <h1 className="mt-4 mb-4">Inicio</h1>

        <div className="row">
          <div className='col-md-1'></div>

          <div className="col-md-5 accordion-container information-container">
            <h2>Información sobre Carros</h2>
            <Accordion defaultActiveKey="0">
              {drivers.slice((driverPage - 1) * driversPerPage, driverPage * driversPerPage).map(driver => (
                <Accordion.Item eventKey={driver.id} key={driver.id}>
                  <Accordion.Header>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>Modelo: {driver.model}</p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '20px' }}>
                      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>ID: {driver.id}</p>
                        <p style={{ fontSize: '16px', marginBottom: '5px' }}>Capacidad: {driver.capacity}</p>
                      </div>
                      <img src={driver.img_url} alt={driver.model} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }} />
                    </div>
                   
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            {/* Paginación de conductores */}
            <Pagination>
              {Array.from({ length: Math.ceil(drivers.length / driversPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === driverPage} onClick={(event) => handleDriverPageChange(event, index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
          <div className="col-md-5 accordion-container route-container">
            <h2>Lista de Rutas</h2>
            <Accordion defaultActiveKey="0">
              {routes.slice((routePage - 1) * routesPerPage, routePage * routesPerPage).map(route => (
                <Accordion.Item eventKey={route.id} key={route.id}>
                  <Accordion.Header style={{ display: 'flex', alignItems: 'center' }}>
  {route.route_name}
  <div style={{ marginLeft: 'auto' }}> {/* Establece TrafficInfo a la derecha */}
    <TrafficInfo
      originLat={route.origin_lat}
      originLng={route.origin_lng}
      destinationLat={route.destination_lat}
      destinationLng={route.destination_lng}
    />
  </div>
</Accordion.Header>

                  <Accordion.Body>
                
                    
                      <WeatherInfo
                        lat={parseFloat(route.origin_lat)}
                        lng={parseFloat(route.origin_lng)}
                      />
                    {isScriptLoaded && ( // Renderizar solo si el script se ha cargado
                      <MapWithDirections
                        origin={{
                          lat: parseFloat(route.origin_lat),
                          lng: parseFloat(route.origin_lng)
                        }}
                        destination={{
                          lat: parseFloat(route.destination_lat),
                          lng: parseFloat(route.destination_lng)
                        }}
                      />
                    )}
                     
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            {/* Paginación de rutas */}
            <Pagination>
              {Array.from({ length: Math.ceil(routes.length / routesPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === routePage} onClick={(event) => handleRoutePageChange(event, index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
        <br></br>
      </div>

      {/* Cargar el script solo si aún no se ha cargado */}
      {!isScriptLoaded && (
        <LoadScript
          googleMapsApiKey="AIzaSyDlwND26rvK2XZKvqBhHI_h9xV_iHy72_8"
          onLoad={() => setIsScriptLoaded(true)}
        />
      )}
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Navbar from "../menu/menu";
import './home.css'; // Importa el archivo de estilos CSS
import MapWithDirections from '../maps/MapWithDirections';
import { LoadScript } from '@react-google-maps/api'; // Importa LoadScript

function Home() {
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [expandedDriver, setExpandedDriver] = useState(null);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Estado para controlar si el script ya se ha cargado

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
  {drivers.map(driver => (
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
          </div>
          <div className="col-md-5 accordion-container route-container">
            <h2>Lista de Rutas</h2>
            <Accordion defaultActiveKey="0">
              {routes.map(route => (
                <Accordion.Item eventKey={route.id}>
                  <Accordion.Header>
                    {route.route_name}
                  </Accordion.Header>
                  <Accordion.Body>
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

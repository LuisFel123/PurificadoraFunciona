import React, { useState, useEffect } from 'react';
import Navbar from "../menu/menu"
import './home.css'; // Importa el archivo de estilos CSS
function Home() {
  const [drivers, setDrivers] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, manejar la situación apropiadamente, tal vez redirigir a la página de inicio de sesión.
      return;
    }

    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/drivers', {
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

  // Función para hacer auto-scroll
  const scrollToBottom = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const driversRef = React.createRef();
  const routesRef = React.createRef();

  useEffect(() => {
    scrollToBottom(driversRef);
    scrollToBottom(routesRef);
  }, [drivers, routes]);

  console.log('Drivers en el HTML:', drivers); // Verificar si los datos están en el estado
  console.log('Routes en el HTML:', routes); // Verificar si los datos están en el estado


  return (
    <div className="home-container">
      <Navbar />

      <div className="content-container">
        <h1 className="mt-4 mb-4">Inicio</h1>

        <div className="row">
          <div className="col-md-6">
            <h2>Información sobre Carros</h2>
            <div className="card">
              <div className="card-body">
                {/* Aquí puedes mostrar la información de los conductores */}
                <ul className="list-group" ref={driversRef}>
                  {drivers.map(driver => (
                    <li key={driver.id} className="list-group-item">{driver.license}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2>Lista de Rutas</h2>
            <div className="card">
              <div className="card-body">
                {/* Aquí puedes mostrar la información de las rutas */}
                <ul className="list-group" ref={routesRef}>
                  {routes.map(route => (
                    <li key={route.id} className="list-group-item">{route.route_name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Home;

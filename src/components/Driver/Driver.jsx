// resources/js/components/Driver.jsx
import Navbar from "../menu/menu";
import './Driver.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


export function Driver() {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Verificar si hay un token
        if (token) {
            // Configurar el token en las cabeceras de la solicitud de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Realizar la solicitud GET a la API para obtener los conductores
            axios.get('http://127.0.0.1:8000/api/drivers')
                .then(response => {
                    // Actualizar el estado con los datos de los conductores recibidos
                    setDrivers(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener los conductores:', error);
                });
        }
    }, []); // Se ejecuta solo una vez al cargar el componente

    return (

        <div className="home-container1">
            <Navbar />
            <div id="tablaCentra">
                <Table striped bordered hover className="tablaRe">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Licencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapear los conductores y mostrarlos en la tabla */}
                        {drivers.map(driver => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.license}</td>
                                <td>
                                    <div className="botonesc">
                                    <Button variant="primary">Ver</Button>
                                    <Button variant="warning">Actualizar</Button>
                                    <Button variant="danger">Eliminar</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </div>

        </div>
    );
}
export default Driver;

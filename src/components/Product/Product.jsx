import Navbar from "../menu/menu"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Product/Product.css'
import { useState, useEffect } from 'react';
import axios from 'axios';




function Product() {
    //const [count, setCount] = useState(0)
    const [drivers, setDrivers] = useState([]);


    //mostrar todos los conductores
    useEffect(() => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Verificar si hay un token
        if (token) {
            // Configurar el token en las cabeceras de la solicitud de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Realizar la solicitud GET a la API para obtener los conductores
            axios.get('http://127.0.0.1:8000/api/carboy')
                .then(response => {
                    // Actualizar el estado con los datos de los conductores recibidos
                    setDrivers(response.data);

                })
                .catch(error => {
                    console.error('Error al obtener los productos:', error);
                });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="containerDos">
                <Row>
                    {drivers.map(driver => (
                        <Col md={4} key={driver.id}>
                            <Card style={{ width: '18rem' }} className="productos">
                                <Card.Img variant="top" src="public/botellon.png" className="imagen" />
                                <Card.Body>
                                    <Card.Text>
                                        Id: {driver.id}
                                    </Card.Text>

                                    <Card.Text>
                                        Estado: {driver.state}
                                    </Card.Text>

                                    <Card.Text>
                                        Color: {driver.color}
                                    </Card.Text>

                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </div>
        </>
    )
}

export default Product

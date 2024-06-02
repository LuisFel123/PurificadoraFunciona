import Navbar from "../menu/menu"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Product/Product.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';






function Product() {
    //const [count, setCount] = useState(0)
    const [drivers, setDrivers] = useState([]);
    const handleCloseInsert = () => setShowI(false);
    const [showI, setShowI] = useState(false);
    const [showA, setShowA] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');



    const [nameU, setNameU] = useState('');
    const [licenseU, setLicenseU] = useState('');

    const handleShowI = () => {
        setShowI(true);
        setNameU("");
        setLicenseU("");

    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    //mostrar los productos
    useEffect(() => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Verificar si hay un token
        if (token) {
            // Configurar el token en las cabeceras de la solicitud de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Realizar la solicitud GET a la API para obtener los conductores
            axios.get('http://127.0.0.1:8000/api/getType')
                .then(response => {
                    // Actualizar el estado con los datos de los conductores recibidos
                    setDrivers(response.data);

                })
                .catch(error => {
                    console.error('Error al obtener los productos:', error);
                });
        }
    }, []);

    //insertar productos
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { name: nameU, license: licenseU };
            await axios.post(`http://127.0.0.1:8000/api/createDriver`, updatedDriver);
            console.log('Conductor actualizado con éxito');
            setShowA(false);
            window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.log('Error al insertar los datos:', error);
        }
    };





    return (
        <>
            <Navbar />
            <div className="containerDos">

                {/*Boton para insertar productos */}
                <Button variant="success" id="insert1" onClick={handleShowI}>Insertar Producto</Button>{' '}
                {/*Modal para insertar los productos*/}
                <Modal show={showI} onHide={handleCloseInsert} backdropClassName="custom-backdropdos">
                    <Modal.Header closeButton>
                        <Modal.Title>Insertar conductor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select value={selectedOption} onChange={handleChange}>
                                    <option value="opcion1">nuevo</option>
                                    <option value="opcion2">seminuevo</option>
                                    <option value="opcion3">buen estado</option>
                                    <option value="opcion4">dañado</option>
                                    <option value="opcion4">roto</option>


                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Rojo"
                                    autoFocus
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Capacidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="10"
                                    autoFocus
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="5"
                                    autoFocus
                                />
                            </Form.Group>






                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseInsert}>
                            Cancelar
                        </Button>
                        <Button variant="success" onClick={handleSubmit}>
                            Aceptar
                        </Button>
                    </Modal.Footer>
                </Modal>


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

                                    <Card.Text>
                                        Capacidad: {driver.carboy_types.capacity}
                                    </Card.Text>

                                    <Card.Text>
                                        Cantidad existencia: {driver.cantidad}
                                    </Card.Text>

                                    <Card.Text>
                                        Precio: {driver.carboy_types.price}
                                    </Card.Text>

                                    <Button variant="warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                            <path d="M16 5l3 3" />
                                        </svg>
                                    </Button>{' '}

                                    <Button variant="danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7h16" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            <path d="M10 12l4 4m0 -4l-4 4" />
                                        </svg>
                                    </Button>{' '}


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

// resources/js/components/Driver.jsx
import Navbar from "../menu/menu";
import './Driver.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';




export function Driver() {
    const [drivers, setDrivers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Número de elementos por página
    const totalPages = Math.ceil(drivers.length / itemsPerPage);
    const [show, setShow] = useState(false);
    const [showA, setShowA] = useState(false);
    const [showI, setShowI] = useState(false);

    const [idC, setIdC] = useState('');
    const [nameU, setNameU] = useState('');
    const [licenseU, setLicenseU] = useState('');



    const handleClose = () => setShow(false);
    const handleCloseActu = () => setShowA(false);
    const handleCloseInsert = () => setShowI(false);

    const handleNameChangeU = (e) => setNameU(e.target.value);
    const handleLicenseChangeU = (e) => setLicenseU(e.target.value);





    //mostrar todos los conductores
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

    //eliminar un conductor
    const deleteDriver = (driverId) => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');
        console.log(driverId);

        if (token) {
            // Configurar el token en las cabeceras de la solicitud de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Realizar la solicitud DELETE a la API para eliminar el conductor
            axios.delete(`http://127.0.0.1:8000/api/drivers/${driverId}`)
                .then(response => {
                    // Eliminar el conductor del estado
                    console.log(response.data);
                    console.log("Eliminacion de usuario correcta");
                    setDrivers(drivers.filter(driver => driver.id !== driverId));
                    setShow(false);

                })
                .catch(error => {
                    console.error('Error al eliminar el conductor:', error);
                });
        }

    };

    //para eliminar un determinado conductor
    const handleShowDelete = (driverId) => {
        setShow(true);
        console.log(driverId);
        setIdC(driverId);

    };


    //para obtener el id y los datos para actualizar
    const handleShowUpdate = (driverId, nameT, licenseT) => {
        setShowA(true);
        console.log(driverId);

        setIdC(driverId);
        setNameU(nameT);
        setLicenseU(licenseT);


    };


    const handleShowI = () => {
        setShowI(true);
        setNameU("");
        setLicenseU("");

    };






    //actualizar el conductor
    const handleUpdateDriver = async (driverId) => {
        try {
            console.log(driverId)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { name: nameU, license: licenseU };
            await axios.put(`http://127.0.0.1:8000/api/drivers/${driverId}`, updatedDriver);
            console.log('Conductor actualizado con éxito');
            setShowA(false);
            window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al actualizar el conductor:', error);
        }
    };

    //insertar un usuario
    /*
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const name=nameU;
                const license=licenseU;
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                const response = await axios.post('http://127.0.0.1:8000/api/createDriver', {
                    name,
                    license,
                });
    
                console.log('Conductor agregado con éxito:', response.data);
    
                // Limpiar el formulario después de agregar el conductor
                setNameU('');
                setLicenseU('');
            } catch (error) {
                console.error('Error al agregar el conductor:', error);
            }
        };
        */
    //insertar conductor
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

    const paginatedDrivers = drivers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Crear elementos de paginación
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }



    return (

        <div className="home-container1">
            <Navbar />
            <Button variant="success" id="insert" onClick={handleShowI}>Insertar conductor</Button>{' '}

            <Modal show={showI} onHide={handleCloseInsert} backdropClassName="custom-backdropdos">
                <Modal.Header closeButton>
                    <Modal.Title>Insertar conductor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                autoFocus
                                value={nameU}
                                onChange={handleNameChangeU}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Licencia</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Licencia"
                                autoFocus
                                value={licenseU}
                                onChange={handleLicenseChangeU}
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




            <div id="tablaCentra">
                <Table striped bordered hover className="tablaRe">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Licencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapear los conductores y mostrarlos en la tabla */}
                        {/*{drivers.map(driver => (*/}
                        {paginatedDrivers.map(driver => (

                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.name}</td>
                                <td>{driver.license}</td>
                                <td>
                                    <div className="botonesc">


                                        <Button variant="primary" >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                            </svg>
                                        </Button>













                                        <Button variant="warning" onClick={() => handleShowUpdate(driver.id, driver.name, driver.license)} >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                <path d="M16 5l3 3" />
                                            </svg>
                                        </Button>

                                        <Modal show={showA} onHide={handleCloseActu} backdropClassName="custom-backdrop">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Actualizar conductor</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Nombre</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Nombre"
                                                            autoFocus
                                                            value={nameU}
                                                            onChange={handleNameChangeU}


                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Licencia</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Licencia"
                                                            value={licenseU}
                                                            onChange={handleLicenseChangeU}

                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={handleCloseActu}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="success" onClick={() => handleUpdateDriver(idC)}>
                                                    Aceptar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>






                                        <Button variant="danger" onClick={() => handleShowDelete(driver.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M4 7h16" />
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                <path d="M10 12l4 4m0 -4l-4 4" />
                                            </svg>
                                        </Button>

                                        <Modal show={show} onHide={handleClose} backdropClassName="custom-backdrop">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Eliminar conductor</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>¿Estás seguro de eliminar al conductor?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={handleClose}>
                                                    Cancelar
                                                </Button>
                                                <Button variant="success" key={driver.id} onClick={() => deleteDriver(idC)}>
                                                    Aceptar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/*))}*/}

                    </tbody>
                </Table>
                <div className="pagination-container">
                    <Pagination className="pagination-right">
                        {paginationItems}
                    </Pagination>
                </div>

            </div>

        </div>
    );
}
export default Driver;

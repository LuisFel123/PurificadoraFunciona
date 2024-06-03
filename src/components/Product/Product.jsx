import Navbar from "../menu/menu"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Product/Product.css'
import { useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';







export function Product() {
    //const [count, setCount] = useState(0)
    const [drivers, setDrivers] = useState([]);
    const handleCloseInsert = () => setShowI(false);
    const [showI, setShowI] = useState(false);
    const [showA, setShowA] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [show, setShow] = useState(false);
    const [idC, setIdC] = useState('');
    const handleClose = () => setShow(false);
    const handleCloseActu = () => setShowA(false);
    const [pageNumber, setPageNumber] = useState(0);
    const driversPerPage = 6;
    const pagesVisited = pageNumber * driversPerPage;


    const [estadoU, setEstadoU] = useState('');
    const [cantidadU, setCantidadU] = useState('');
    const [capacidadU, setCapacidadU] = useState('');
    const [precioU, setPrecioU] = useState('');
    const [colorU, setColorU] = useState('');
    const [img_url, setimg_url] = useState('');



    const handleShowDelete = (driverId) => {
        setShow(true);
        console.log(driverId);
        setIdC(driverId);

    };



    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setimg_url(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    const handleShowI = () => {
        setShowI(true);
        setEstadoU("");
        setCantidadU("");
        setCapacidadU("");
        setPrecioU("");
        setColorU("");


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

    //insertar  tipo de productos
    const handleSubmitTypeCar = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = {
                capacity: capacidadU,
                price: precioU,


            };
            const response = await axios.post(`http://127.0.0.1:8000/api/createCarboyType`, updatedDriver);
            console.log('Tipo de producto insertado con éxito');
            const carboyTypeId = response.data.id;

            console.log('ID del tipo de producto insertado:', carboyTypeId);
            setShowA(false);
            
            return carboyTypeId;

            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.log('Error al insertar los datos del tipo de producto:', error);
        }
    };

// Definir la variable pageCount
const pageCount = Math.ceil(drivers.length / driversPerPage);

const changePage = ({ selected }) => {
    setPageNumber(selected);
};

    //insertar un producto
    const handleSubmit = async () => {
        try {
            const carboyTypeId = await handleSubmitTypeCar();
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = {
                state: selectedOption,
                color: colorU,
                cantidad: parseFloat(cantidadU),
                carboyType_id: carboyTypeId,
                img:img_url
            };
            await axios.post(`http://127.0.0.1:8000/api/createCarboy`, updatedDriver);
            console.log('Producto insertado con éxito');
            setShowA(false);
            window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.log('Error al insertar los datos  del producto:', error);
        }
    };


    //eliminar un producto
    const deleteDriver = (driverId) => {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');
        console.log(driverId);

        if (token) {
            // Configurar el token en las cabeceras de la solicitud de Axios
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Realizar la solicitud DELETE a la API para eliminar el conductor
            axios.delete(`http://127.0.0.1:8000/api/carboy/${driverId}`)
                .then(response => {
                    // Eliminar el conductor del estado
                    console.log(response.data);
                    console.log("Eliminacion de producto correcta");
                    setDrivers(drivers.filter(driver => driver.id !== driverId));
                    setShow(false);

                })
                .catch(error => {
                    console.error('Error al eliminar el producto:', error);
                });
        }

    };
    //para obtener el id y los datos para actualizar
    const handleShowUpdate = (driverId, estado, color, capacidad, cantidad, precio) => {
        setShowA(true);
        console.log(driverId);

        setIdC(driverId);
        setEstadoU(estado);
        setCantidadU(cantidad);
        setCapacidadU(capacidad);
        setPrecioU(precio);
        setColorU(color);




    };
    //actualizar el  producto
    {/*
    const handleUpdateDriver = async (driverId) => {
        try {
            console.log(driverId)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { state: estadoU, color: colorU, cantidad: cantidadU};
            await axios.put(`http://127.0.0.1:8000/api/carboy/${driverId}`, updatedDriver);
            console.log('Producto actualizado con éxito');
            await handleUpdateDrivertypes(driverId);
            setShowA(false);
            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    //actualizar el  producto tipos
    const handleUpdateDrivertypes = async (driverId) => {
        try {
            const idF=obtenerIdTy(driverId);
            console.log("llave foranea del tipo de producto",idF)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { capacity: capacidadU, price: precioU };
            await axios.put(`http://127.0.0.1:8000/api/carboy-types/${idF}`, updatedDriver);
            console.log('Tipos de Producto actualizado con éxito');
            setShowA(false);
            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al actualizar los tipos de  productos:', error);
        }
    };


    const obtenerIdTy = async (driverId) => {
        try {
            console.log(driverId)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const foranea=await axios.get(`http://127.0.0.1:8000/api/getForane/${driverId}`);
            return foranea;
            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al obtener la llave foranea:', error);
        }
    };
*/}
    const handleUpdateDriver = async (driverId) => {
        try {
            console.log(driverId)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { state: estadoU, color: colorU, cantidad: cantidadU };
            await axios.put(`http://127.0.0.1:8000/api/carboy/${driverId}`, updatedDriver);
            console.log('Producto actualizado con éxito');

            const idF = await obtenerIdTy(driverId); // Esperar a que se resuelva la promesa
            console.log("llave foranea del tipo de producto", idF)

            await handleUpdateDrivertypes(idF); // Pasar el ID obtenido

            setShowA(false);
            window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    // actualizar el  producto tipos
    const handleUpdateDrivertypes = async (idF) => { // Recibir el ID como argumento
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const updatedDriver = { capacity: capacidadU, price: precioU };
            await axios.put(`http://127.0.0.1:8000/api/carboy-types/${idF}`, updatedDriver);
            console.log('Tipos de Producto actualizado con éxito');
            setShowA(false);
            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al actualizar los tipos de  productos:', error);
        }
    };

    const obtenerIdTy = async (driverId) => {
        try {
            console.log(driverId)
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const foranea = await axios.get(`http://127.0.0.1:8000/api/getForane/${driverId}`);
            return foranea.data; // Devolver solo los datos
            //window.location.reload(); // Recargar la página actual
        } catch (error) {
            console.error('Error al obtener la llave foranea:', error);
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
                        <Modal.Title>Insertar producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option value="">Selecciona un estado</option>
                                    <option value="nuevo">nuevo</option>
                                    <option value="seminuevo">seminuevo</option>
                                    <option value="buen estado">buen estado</option>
                                    <option value="dañado">dañado</option>
                                    <option value="roto">roto</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Rojo"
                                    autoFocus
                                    value={colorU}
                                    onChange={(e) => setColorU(e.target.value)}



                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="10"
                                    autoFocus
                                    value={cantidadU}
                                    onChange={(e) => setCantidadU(e.target.value)}



                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Capacidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="20.5"
                                    autoFocus
                                    value={capacidadU}
                                    onChange={(e) => setCapacidadU(e.target.value)}



                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="5.5"
                                    autoFocus
                                    value={precioU}
                                    onChange={(e) => setPrecioU(e.target.value)}


                                />
                            </Form.Group>
                            <Form.Group controlId="editImgUrl">
              <Form.Label>Subir imagen</Form.Label>
              <Form.Control
                type="file"
                name="img_url"
                onChange={handleEditImageUpload}
                accept="image/*"
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
                    {drivers.slice(pagesVisited, pagesVisited + driversPerPage)
                        .map(driver => (
                        <Col md={4} key={driver.id}>
                            <Card style={{ width: '18rem' }} className="productos">
                                
                                <Card.Img variant="top" src={driver.img} className="imagen" />
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


                                    {/*Actualizar el producto */}

                                    <Button variant="warning" onClick={() => handleShowUpdate(driver.id, driver.state, driver.color, driver.carboy_types.capacity, driver.cantidad, driver.carboy_types.price)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                            <path d="M16 5l3 3" />
                                        </svg>
                                    </Button>{' '}
                                    <Modal show={showA} onHide={handleCloseActu} backdropClassName="custom-backdropdos">
                                        <Modal.Header closeButton>
                                            <Modal.Title>Editar producto</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>

                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Estado</Form.Label>
                                                    <Form.Select value={estadoU} onChange={(e) => setEstadoU(e.target.value)}>
                                                        <option value="">Selecciona un estado</option>
                                                        <option value="nuevo">nuevo</option>
                                                        <option value="seminuevo">seminuevo</option>
                                                        <option value="buen estado">buen estado</option>
                                                        <option value="dañado">dañado</option>
                                                        <option value="roto">roto</option>
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Color</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Rojo"
                                                        autoFocus
                                                        value={colorU}
                                                        onChange={(e) => setColorU(e.target.value)}



                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Cantidad</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="10"
                                                        autoFocus
                                                        value={cantidadU}
                                                        onChange={(e) => setCantidadU(e.target.value)}



                                                    />
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Capacidad</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="20.5"
                                                        autoFocus
                                                        value={capacidadU}
                                                        onChange={(e) => setCapacidadU(e.target.value)}



                                                    />
                                                </Form.Group>


                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <Form.Label>Precio</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="5.5"
                                                        autoFocus
                                                        value={precioU}
                                                        onChange={(e) => setPrecioU(e.target.value)}


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











                                    {/*Eliminar un producto */}
                                    <Button variant="danger" onClick={() => handleShowDelete(driver.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7h16" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            <path d="M10 12l4 4m0 -4l-4 4" />
                                        </svg>
                                    </Button>{' '}

                                    <Modal className="modalM" show={show} onHide={handleClose} backdropClassName="custom-backdrop" >
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


                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <ReactPaginate
    previousLabel={'Anterior'}
    nextLabel={'Siguiente'}
    pageCount={pageCount}
    onPageChange={changePage}
    containerClassName={'pagination-container'}
    previousLinkClassName={'pagination-button prev-next'}
    nextLinkClassName={'pagination-button prev-next'}
    pageClassName={'pagination-page'}
    activeClassName={'active'}
/>

            </div>
        </>
    )
}

export default Product
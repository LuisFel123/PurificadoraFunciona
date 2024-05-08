import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useContext }from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { UserContext } from '../../UserContext';



function Login() {
    const { loginUser } = useContext(UserContext);
    const { registerUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [showDos, setShowDos] = useState(false);
    //const handleShow = () => setShow(true);
    const handleShowTres = () => setShowTres(true);
    //const handleShowCuatro = () => setShowTres(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedInDos, setIsLoggedInDos] = useState(false);
    const LoggedInTres = useState(false);
    const [showTres, setShowTres] = useState(false);
    const [isLoggedInTarje, setIsLoggedInTarje] = useState(false);
    const [showTarje, setShowTarje] = useState(false);

    const handleClose = () => {
        setEmail('');
        setPassword('');
        setShow(false);
        setIsLoggedIn(false);
    };
    const handleCloseDos = () => {
        setEmail('');
        setPassword('');
        setShowDos(false);
        setIsLoggedInDos(false);
    };

    const handleCloseTres = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShowTres(false);
        LoggedInTres;

    };

    const handleCloseTarje = () => {
        setName('');
        setEmail('');
        setPassword('');
        setShowTarje(false);
        setIsLoggedInTarje(false);
    };



    /*
        const handleCheckUser = async () => {
            const token = '1|eITluB32KRbKuKMgY8yQu2lUyCmyUPfQIjzdhb2s1b42fc4e';
    
            try {
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/validar',
                    { email, password },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                //const { email: userEmail } = response.data;
                const token2=response.data.token;
                const correo=response.data.email;
    
                console.log('Correo electrónico: '+correo);
                console.log("Token del usuario: "+token2)
                localStorage.setItem("token", token2);
    
                if (response.status === 200) {
                    console.log('Inicio de sesion exitoso');
                    setShow(true);
                    setIsLoggedIn(true); // Establecer isLoggedIn en true cuando el inicio de sesión sea exitoso
                } else {
                    console.log('No se pudo iniciar sesion');
                    setIsLoggedInDos(true);
                    setShowDos(true);
                }
            } catch (error) {
                console.log('Correo o usuario incorrectos    ');
                setIsLoggedInDos(true);
                setShowDos(true);
    
    
            }
        };
    */
    const handleCheckUser = async () => {

        try {
            const success = await loginUser(email, password);
            if (success) {
                console.log('Inicio de sesion exitoso');
                const token2 = success.data.token;
                const correo = success.data.email;
                console.log('Correo electrónico: ' + correo);
                console.log('Token: ' + token2);
                localStorage.setItem("token", token2);
                setShow(true);
                setIsLoggedIn(true);
            } else {
                console.log('Verifique usuario y contraseña')
                setIsLoggedInDos(true);
                setShowDos(true);
            }
        } catch (error) {

            console.log('No se pudo iniciar sesion ' + error);
            setIsLoggedInDos(true);
            setShowDos(true);
        }
    };

    /*
    const handleInsertUser = async () => {
        const token = '1|eITluB32KRbKuKMgY8yQu2lUyCmyUPfQIjzdhb2s1b42fc4e';
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/userregister',
                { name, email, password },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 200) {
                console.log('Usuario insertado exitosamente');
                // Aquí puedes manejar alguna lógica adicional si es necesario
                setShowTres(false);
                setShowTarje(true);
                setName('');
                setEmail('');
                setPassword('');

            } else {
                console.log('No se pudo insertar el usuario');
                // Aquí puedes manejar algún escenario de error si es necesario
                setIsLoggedInTarje(true);
                setShowTarje(true);
            }
        } catch (error) {
            console.log('Error al insertar usuario: ' + error);
            // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
            setIsLoggedInTarje(true);
            setShowTarje(true);
        }
    };
    */

    const handleInsertUser = async () => {
        try {
            const success = await registerUser(name, email, password);
            if (success) {
                console.log('Usuario insertado exitosamente');
                setShowTres(false);
                setShowTarje(true);
                setName('');
                setEmail('');
                setPassword('');
            } else {
                console.log('No se pudo insertar el usuario');
                setIsLoggedInTarje(true);
                setShowTarje(true);
            }
        } catch (error) {

            console.log('Error al insertar usuario: ' + error);
            setIsLoggedInTarje(true);
            setShowTarje(true);
        }
    };

    return (
        <div className="Login">

            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Card className="mt-3 text-center" border="danger">
                            <Card.Body >
                                <Card.Title className="text-center">Iniciar Sesión</Card.Title>

                                <Form>


                                    <Form.Group className='mt-4' controlId="email">
                                        <Form.Label>Correo Electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Ingrese su correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className='mt-4' controlId="password">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button className='mt-3' variant="primary" onClick={handleCheckUser} type='button'>
                                        Iniciar Sesión
                                    </Button>


                                    <div></div>


                                    <Button className='mt-3' variant="danger" onClick={handleShowTres}>
                                        Registrarse
                                    </Button>

                                    <Modal show={showTres} onHide={handleCloseTres}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Inserte su información para Registrarse</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>

                                            <Form>
                                                <Form.Group className="mb-3" controlId="formNombre">
                                                    <Form.Label>Nombre</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nombre"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required />
                                                </Form.Group>


                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Correo electrónico</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="example1@hotmail.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Nunca compartiremos su correo electrónico con nadie más.
                                                    </Form.Text>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Contraseña</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Button variant="success" type="button" onClick={handleInsertUser} >
                                                    Registrar información
                                                </Button>

                                                <Button className="mx-2" variant="danger" onClick={handleCloseTres}>
                                                    Cerrar
                                                </Button>

                                            </Form>

                                        </Modal.Body>

                                    </Modal>

                                    {isLoggedIn && (


                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Bienvenido</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Haz iniciado sesión exitosamente.</p>
                                            </Modal.Body>
                                            <Modal.Footer>



                                            </Modal.Footer>
                                        </Modal>

                                    )}

                                    {isLoggedInDos && (
                                        <Modal show={showDos} onHide={handleCloseDos}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Alerta!!</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Verifique usuario y contraseña.</p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            </Modal.Footer>
                                        </Modal>
                                    )}

                                    {isLoggedInTarje && (
                                        <Modal show={showTarje} onHide={handleCloseTarje} >
                                            <Modal.Header closeButton className="bg-dark text-white">
                                                <Modal.Title>Alerta!!</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p>Verifique Los Datos Ingresados.</p>
                                            </Modal.Body>
                                            <Modal.Footer className="bg-dark text-white">
                                            </Modal.Footer>
                                        </Modal>
                                    )}


                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Login;

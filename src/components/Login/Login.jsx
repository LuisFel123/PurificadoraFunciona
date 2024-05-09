import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useContext }from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { UserContext } from '../../UserContext';

import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { loginUser } = useContext(UserContext);
    const { registerUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const navigacion=useNavigate();
    const [password, setPassword] = useState('');
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [name, setName] = useState('');
    const [nameEmpty, setnNameEmpty] = useState(false);

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
// Verificar si los campos están llenos
if (email.trim() === '') {
    setEmailEmpty(true);
} else {
    setEmailEmpty(false);
}

if (password.trim() === '') {
    setPasswordEmpty(true);
} else {
    setPasswordEmpty(false);
}
if (email.trim() !== '' && password.trim() !== '') {
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
                navigacion("/home");

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
        if (email.trim() === '') {
            setEmailEmpty(true);
        } else {
            setEmailEmpty(false);
        }
        
        if (password.trim() === '') {
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }
        if(name.trim()==''){
            setnNameEmpty(true);
        }else{
            setnNameEmpty(false);
        }
        if (email.trim() !== '' && password.trim() !== '' && name.trim() !='') {

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
    }
    };

    return (
        <div className="Login">
        <Container className="h-100 d-flex justify-content-center align-items-center">
            <Row className="border rounded shadow p-4 rowCostum">
            <Col md={6} className="p-4  border-end">
    <Card className="mt-3 text-center custom ">
        <h3>Iniciar Sesión</h3>
        <div className="custom-form">
            <div className="mt-4">
                <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="email" className="custom-label me-3">Correo Electrónico</label>
                    <input
                        type="email"
                        className={`custom-input ${emailEmpty ? 'empty-input' : ''}`}
                        id="email"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {emailEmpty && <p className="error-message">Por favor, ingrese su correo electrónico.</p>}

                <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="password" className="custom-label me-3">Contraseña</label>
                    <input
                        type="password"
                        className={`custom-input ${passwordEmpty ? 'empty-input' : ''}`}
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {passwordEmpty && <p className="error-message">Por favor, ingrese su contraseña.</p>}

            </div>
            {isLoggedInDos && (
            <p className="error-message">Hubo un error al iniciar sesión. Verifique su usuario y contraseña.</p>
        )}
            <button className='custom-button mt-3' onClick={handleCheckUser} type='button'>
                Iniciar Sesión
            </button>
            
        </div>
    </Card>
</Col>

<Col md={6} className="ps-4">
    <div className="welcome-message  text-center">
        <h2>Bienvenido</h2>
        <div className="image-animation">
            <img src="/gota.png" alt="Imagen de bienvenida" className="animated-image" />
        </div>
        <p onClick={() => setShowTres(true)}>¿Nuevo aquí? Regístrate para obtener una cuenta.</p>
        <div className="mt-3">
            <a href="#" className="custom-link">¿Olvidaste tu contraseña?</a>
        </div>
    </div>
</Col>

            </Row>
        </Container>
        <Modal show={showTres} onHide={handleCloseTres}>
    <Modal.Header closeButton>
        <Modal.Title>Inserte su información para Registrarse</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div className="custom-form">
            <div className="mb-3">
                <label htmlFor="formNombre">Nombre</label>
                <input
                    type="text"
                    className={`form-control ${nameEmpty ? 'empty-input' : ''}`}
                    id="formNombre"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {nameEmpty && <p className="error-message">Por favor, ingrese su nombre.</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="formBasicEmail">Correo electrónico</label>
                <input
                    type="email"
                    className={`form-control ${emailEmpty ? 'empty-input' : ''}`}
                    id="formBasicEmail"
                    placeholder="example1@hotmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {emailEmpty && <p className="error-message">Por favor, ingrese su correo electrónico.</p>}
                <small className="text-muted">Nunca compartiremos su correo electrónico con nadie más.</small>
            </div>
            <div className="mb-3">
                <label htmlFor="formBasicPassword">Contraseña</label>
                <input
                    type="password"
                    className={`form-control ${passwordEmpty ? 'empty-input' : ''}`}
                    id="formBasicPassword"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {passwordEmpty && <p className="error-message">Por favor, ingrese su contraseña.</p>}
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="success" type="button" onClick={handleInsertUser}>
            Registrar información
        </Button>
        <Button variant="danger" onClick={handleCloseTres}>
            Cerrar
        </Button>
    </Modal.Footer>
</Modal>

    </div>
);
}


export default Login;

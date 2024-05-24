import { useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { UserContext } from "../../UserContext";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser, registerUser,errorMessage } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [name, setName] = useState("");
  const [nameEmpty, setnNameEmpty] = useState(false);
  const [show, setShow] = useState(false);
  const [showDos, setShowDos] = useState(false);
  const [showTres, setShowTres] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInDos, setIsLoggedInDos] = useState(false);
  const [isLoggedInTarje, setIsLoggedInTarje] = useState(false);
  const [showTarje, setShowTarje] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);
  const navigacion = useNavigate();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setShow(false);
    setIsLoggedIn(false);
  };

  const handleCloseDos = () => {
    setEmail("");
    setPassword("");
    setShowDos(false);
    setIsLoggedInDos(false);
  };

  const handleCloseTres = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowTres(false);
  };

  const handleCloseTarje = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShowTarje(false);
    setIsLoggedInTarje(false);
  };

  const handleCheckUser = async () => {
    if (email.trim() === "") setEmailEmpty(true);
    else setEmailEmpty(false);

    if (password.trim() === "") setPasswordEmpty(true);
    else setPasswordEmpty(false);

    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const success = await loginUser(email, password);
        if (success) {
          const token2 = success.data.token;
          const correo = success.data.email;
          localStorage.setItem("token", token2);
          setShow(true);
          setIsLoggedIn(true);
          navigacion("/home");
        } else {
          setIsLoggedInDos(true);
          setShowDos(true);
        }
      } catch (error) {
        setIsLoggedInDos(true);
        setShowDos(true);
      }
    }
  };

  const handleInsertUser = async () => {
    if (email.trim() === "") setEmailEmpty(true);
    else setEmailEmpty(false);

    if (password.trim() === "") setPasswordEmpty(true);
    else setPasswordEmpty(false);

    if (name.trim() === "") setnNameEmpty(true);
    else setnNameEmpty(false);

    if (email.trim() !== "" && password.trim() !== "" && name.trim() !== "") {
      try {
        const success = await registerUser(name, email, password);
        if (success) {
          setShowTres(false);
          setShowTarje(true);
          setName("");
          setEmail("");
          setPassword("");
          setSuccessMessage(true);
          setTimeout(() => setSuccessMessage(false), 3000); // Ocultar el mensaje después de 3 segundos
        } else {
          setIsLoggedInTarje(true);
          setShowTarje(true);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message ===
            "El correo electrónico ya está registrado."
        ) {
          setDuplicateEmailError(true);
          setTimeout(() => setDuplicateEmailError(false), 3000); 
        } else {
          setIsLoggedInTarje(true);
          setShowTarje(true);
        }
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
                    <label htmlFor="email" className="custom-label me-3">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className={`custom-input ${
                        emailEmpty ? "empty-input" : ""
                      }`}
                      id="email"
                      placeholder="Ingrese su correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {emailEmpty && (
                    <p className="error-message">
                      Por favor, ingrese su correo electrónico.
                    </p>
                  )}

                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="password" className="custom-label me-3">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`custom-input ${
                        passwordEmpty ? "empty-input" : ""
                      }`}
                      id="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {passwordEmpty && (
                    <p className="error-message">
                      Por favor, ingrese su contraseña.
                    </p>
                  )}
                </div>
                {isLoggedInDos && (
                  <p className="error-message">
                    Hubo un error al iniciar sesión. Verifique su usuario y
                    contraseña.
                  </p>
                )}
                <button
                  className="custom-button mt-3"
                  onClick={handleCheckUser}
                  type="button"
                >
                  Iniciar Sesión
                </button>
              </div>
            </Card>
          </Col>

          <Col md={6} className="ps-4">
            <div className="welcome-message  text-center">
              <h2>Bienvenido</h2>
              <div className="image-animation">
                <img
                  src="/gota.png"
                  alt="Imagen de bienvenida"
                  className="animated-image"
                />
              </div>
              <p onClick={() => setShowTres(true)}>
                ¿Nuevo aquí? Regístrate para obtener una cuenta.
              </p>
              <div className="mt-3">
                <a href="#" className="custom-link">
                  ¿Olvidaste tu contraseña?
                </a>
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
                className={`form-control ${nameEmpty ? "empty-input" : ""}`}
                id="formNombre"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameEmpty && (
                <p className="error-message">Por favor, ingrese su nombre.</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="formBasicEmail">Correo electrónico</label>
              <input
                type="email"
                className={`form-control ${emailEmpty ? "empty-input" : ""}`}
                id="formBasicEmail"
                placeholder="example1@hotmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailEmpty && (
                <p className="error-message">
                  Por favor, ingrese su correo electrónico.
                </p>
              )}
              <small className="text-muted">
                Nunca compartiremos su correo electrónico con nadie más.
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="formBasicPassword">Contraseña</label>
              <input
                type="password"
                className={`form-control ${passwordEmpty ? "empty-input" : ""}`}
                id="formBasicPassword"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordEmpty && (
                <p className="error-message">
                  Por favor, ingrese su contraseña.
                </p>
              )}
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

      {successMessage && (
        <div className="alert alert-success" role="alert">
          Usuario creado exitosamente.
        </div>
      )}

{duplicateEmailError && (
  <div className="alert alert-danger" role="alert">
    El correo electrónico ya está registrado.
  </div>
)}
    </div>
  );
}

export default Login;

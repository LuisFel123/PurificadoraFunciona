import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  // Obtener el rol del usuario del localStorage
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirigir al usuario a la página den login
    navigate('/login');
    window.location.reload();

  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Andagagüi</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">Inicio</a>
            </li>
            {/* Mostrar opciones para el rol 'admin' */}
            {userRole === 'admin' && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/driver">Conductores</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Rutas">Rutas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Product">Productos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cars">carros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/pedidos">pedidos</a>
                </li>
              </>
            )}
            {/* Mostrar opciones para el rol 'conductor'   "/pedidos" */}
            {userRole === 'conductor' && (
              <>
             <li className="nav-item">
                <a className="nav-link" href="/Rutas">Rutas</a>
              </li>
               <li className="nav-item">
               <a className="nav-link" href="/cars">carros</a>
             </li>
             <li className="nav-item">
                  <a className="nav-link" href="/pedidos">pedidos</a>
                </li>
             </>
            )}
          </ul>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

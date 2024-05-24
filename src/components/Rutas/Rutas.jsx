import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from "../menu/menu";
import  MapWithDirections   from '../maps/MapWithDirections';
import './rutas.css'; // Importa el archivo de estilos CSS
import { LoadScript } from '@react-google-maps/api';
import  MapWithMarkerSelector  from '../maps/MapWithMarkerSelector';

function Rutas() {
  const [showModal, setShowModal] = useState(false);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [rutaNombre, setRutaNombre] = useState('');
  const [rutas, setRutas] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showOriginMapModal, setShowOriginMapModal] = useState(false); // Estado para mostrar el modal del mapa de origen
  const [mapKey, setMapKey] = useState(0); // Estado para controlar la clave del mapa
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Estado para controlar si el script ya se ha cargado
  const [originPosition, setOriginPosition] = useState(null); // Estado para almacenar la posición de origen seleccionada

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const fetchRutas = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/routes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Rutas:', data); // Verificar los datos recibidos
        setRutas(data);
      } catch (error) {
        console.error('Error fetching rutas:', error);
      }
    };

    fetchRutas();
  }, []);

  const handleAgregarRuta = () => {
    // Aquí puedes manejar la lógica para agregar la ruta con el nombre `rutaNombre`
    // Por ahora, simplemente cerraremos el modal y limpiaremos el nombre de la ruta
    setShowModal(false);
    setRutaNombre('');
  };

  const handleVerRuta = (ruta) => {
    setRutaSeleccionada(ruta);
    setShowMapModal(true);
    setMapKey(prevKey => prevKey + 1); // Actualizar la clave del mapa
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
    setRutaSeleccionada(null);
  };

  const handleAgregarOrigen = () => {
    setShowOriginMapModal(true);
  };

  const handleSelectOrigin = (position) => {
    setOriginPosition(position);
    setShowOriginMapModal(false);
  };

  return (
    <div>
      <Navbar />
      <Button variant="primary" onClick={() => setShowModal(true)} className="btn-agregar-rutas">
        Agregar Ruta <i className="fas fa-plus"></i>
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Ruta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="nombreRuta" className="form-label">Nombre de la Ruta:</label>
            <input type="text" className="form-control" id="nombreRuta" value={rutaNombre} onChange={(e) => setRutaNombre(e.target.value)} />
          </div>
          <Button variant="primary" onClick={handleAgregarOrigen}>Agregar Origen</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAgregarRuta}>Guardar Ruta</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMapModal} onHide={handleCloseMapModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{rutaSeleccionada ? rutaSeleccionada.route_name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rutaSeleccionada && (
            <>
              {isScriptLoaded && ( // Renderizar solo si el script se ha cargado
                <MapWithDirections
                  key={mapKey} // Usar la clave para forzar el reinicio del componente
                  origin={{
                    lat: parseFloat(rutaSeleccionada.origin_lat),
                    lng: parseFloat(rutaSeleccionada.origin_lng)
                  }}
                  destination={{
                    lat: parseFloat(rutaSeleccionada.destination_lat),
                    lng: parseFloat(rutaSeleccionada.destination_lng)
                  }}
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMapModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showOriginMapModal} onHide={() => setShowOriginMapModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Origen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isScriptLoaded && ( // Renderizar solo si el script se ha cargado
            <MapWithMarkerSelector
              onMarkerSelect={handleSelectOrigin}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOriginMapModal(false)}>Cancelar</Button>
        </Modal.Footer>
      </Modal>

      {/* Cargar el script solo si aún no se ha cargado */}
      {!isScriptLoaded && (
        <LoadScript
          googleMapsApiKey="AIzaSyDlwND26rvK2XZKvqBhHI_h9xV_iHy72_8"
          onLoad={() => setIsScriptLoaded(true)}
        />
      )}

      {/* Tabla de rutas */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta) => (
              <tr key={ruta.id}>
                <td>{ruta.id}</td>
                <td>{ruta.route_name}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleVerRuta(ruta)}>
                    <i className="fas fa-eye"></i> Ver
                  </button>
                  <button className="btn btn-warning me-2">
                    <i className="fas fa-edit"></i> Editar
                  </button>
                  <button className="btn btn-danger">
                    <i className="fas fa-trash-alt"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Rutas;

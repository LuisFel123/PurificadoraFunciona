import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Navbar from "../menu/menu";
import  MapWithDirections   from '../maps/MapWithDirections';
import './rutas.css'; // Importa el archivo de estilos CSS
import { LoadScript } from '@react-google-maps/api';
import  Map  from '../maps/Map';
import axios from 'axios'; // Importa Axios para realizar solicitudes HTTP
import TrafficInfo from '../TrafficInfo/TrafficInfo'; // Asegúrate de importar el componente TrafficInfo
import WeatherInfo from '../WeatherInfo/WeatherInfo'; // Asegúrate de importar el componente WeatherInfo

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
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para mostrar el modal de eliminación
   const [showEditModal, setShowEditModal] = useState(false); // Estado para mostrar el modal de edición
  const [rutaEditada, setRutaEditada] = useState(null); // Estado para almacenar los datos de la ruta editada
  const [nombreRutaEditado, setNombreRutaEditado] = useState(''); // Estado para almacenar el nuevo nombre de la ruta editada
  const userRole = localStorage.getItem('role');

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

  const handleEditarRuta = async () => {
    const token = localStorage.getItem('token');
    if (!token || !rutaSeleccionada) {
      return;
    }

    const data = {
      route_name: nombreRutaEditado || rutaSeleccionada.route_name, // Usar el nuevo nombre si está disponible, de lo contrario, mantener el nombre original
      origin_lat: coordenadas.lat || parseFloat(rutaSeleccionada.origin_lat),
      origin_lng: coordenadas.lng || parseFloat(rutaSeleccionada.origin_lng),
      destination_lat: coordenadasDestino.lat || parseFloat(rutaSeleccionada.destination_lat),
      destination_lng: coordenadasDestino.lng || parseFloat(rutaSeleccionada.destination_lng),
    };

    try {
      await axios.put(`http://127.0.0.1:8000/api/routes/${rutaSeleccionada.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      setRutas(prevRutas => prevRutas.map(ruta => ruta.id === rutaSeleccionada.id ? { ...ruta, ...data } : ruta));
      showMessageWithAnimation('¡Ruta editada exitosamente!', 'success');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al editar la ruta:', error);
      showMessageWithAnimation('Error al editar la ruta', 'error');
    }
  };

  const handleAgregarRuta = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en que no haya un token disponible
      return;
    }

    const data = {
      route_name: rutaNombre,
      origin_lat: coordenadas.lat,
      origin_lng: coordenadas.lng,
      destination_lat: coordenadasDestino.lat,
      destination_lng: coordenadasDestino.lng,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/routes', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Respuesta de la petición POST:', response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, cerrar el modal
      showMessageWithAnimation('¡Ruta guardada exitosamente!', 'success');
      setShowModal(false);
      setRutaNombre('');
      setCoordenadas(null);
      setCoordenadasDestino(null);
    } catch (error) {
      console.error('Error al guardar la ruta:', error);
      
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };
  const showMessageWithAnimation = (content, type) => {
    setMessageContent(content);
    setMessageType(type);
    setShowMessage(true);
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
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
  const [coordenadas, setCoordenadas] = useState(null);
  const [coordenadasDestino, setcoordenadasDestino] = useState(null);

  const handleSeleccionarUbicacion = (location) => {
    setCoordenadas(location);
  };

  const handleSeleccionarUbicacionDestino = (location) => {
    setcoordenadasDestino(location);
  };

  const [showOrigenModal, setShowOrigenModal] = useState(false);
const [showDestinoModal, setShowDestinoModal] = useState(false);

// Modifica las funciones para manejar la apertura de los modales
const handleAgregarOrigen = () => {
  setShowOrigenModal(true); // Mostrar modal de origen
};

const handleAgregarDestino = () => {
  setShowDestinoModal(true); // Mostrar modal de destino
};
const handleConfirmDelete = async () => {
  const token = localStorage.getItem('token');
  if (!token || !rutaSeleccionada) {
    // Manejar el caso en que no haya un token disponible o no haya una ruta seleccionada
    return;
  }

  try {
    await axios.delete(`http://127.0.0.1:8000/api/routes/${rutaSeleccionada.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Actualizar el estado de rutas después de la eliminación
    setRutas(prevRutas => prevRutas.filter(ruta => ruta.id !== rutaSeleccionada.id));
    showMessageWithAnimation('¡Ruta eliminada exitosamente!', 'success');
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar la ruta:', error);
    showMessageWithAnimation('Error al eliminar la ruta', 'error');
  }
};
  
  return (
    <div>
      {showMessage && (
        <div className={`message ${messageType}`}>
          {messageContent}
        </div>
      )}
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
          <Button variant="primary" onClick={handleAgregarDestino}>Agregar Destino</Button>
         
          {/* Mostrar coordenadas seleccionadas */}
          {coordenadas && (
            <div>
              <h2>Coordenadas de origen</h2>
              <ul>
                <li>Latitud: {coordenadas.lat}</li>
                <li>Longitud: {coordenadas.lng}</li>
              </ul>
            </div>
          )}

          {coordenadasDestino && (
            <div>
              <h2>Coordenadas de destino</h2>
              <ul>
                <li>Latitud: {coordenadasDestino.lat}</li>
                <li>Longitud: {coordenadasDestino.lng}</li>
              </ul>
            </div>
          )}

   
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div className="traffic-weather-container">
    <TrafficInfo
      originLat={rutaSeleccionada.origin_lat}
      originLng={rutaSeleccionada.origin_lng}
      destinationLat={rutaSeleccionada.destination_lat}
      destinationLng={rutaSeleccionada.destination_lng}
    />
    <WeatherInfo
      lat={rutaSeleccionada.origin_lat}
      lng={rutaSeleccionada.origin_lng}
    />
  </div>
</div>

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

      <Modal show={showOrigenModal} onHide={() => setShowOrigenModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Seleccionar Origen</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div>
      <h1>Selecciona una ubicación en el mapa para el origen</h1>
      <Map onSelectLocation={handleSeleccionarUbicacion} />
      {coordenadas && (
        <div>
          <h2>Coordenadas seleccionadas para el origen</h2>
          <ul>
            <li>Latitud: {coordenadas.lat}</li>
            <li>Longitud: {coordenadas.lng}</li>
          </ul>
        </div>
      )}
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowOrigenModal(false)}>Cancelar</Button>
  </Modal.Footer>
</Modal>

<Modal show={showDestinoModal} onHide={() => setShowDestinoModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Seleccionar Destino</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div>
      <h1>Selecciona una ubicación en el mapa para el destino</h1>
      <Map onSelectLocation={handleSeleccionarUbicacionDestino} />
      {coordenadasDestino && (
        <div>
          <h2>Coordenadas seleccionadas para el destino</h2>
          <ul>
            <li>Latitud: {coordenadasDestino.lat}</li>
            <li>Longitud: {coordenadasDestino.lng}</li>
          </ul>
        </div>
      )}
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDestinoModal(false)}>Cancelar</Button>
  </Modal.Footer>
</Modal>
<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta ruta?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ruta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="nombreRutaEditado" className="form-label">Nombre de la Ruta:</label>
            <input type="text" className="form-control" id="nombreRutaEditado" value={nombreRutaEditado} onChange={(e) => setNombreRutaEditado(e.target.value)} />
            <Button variant="primary" onClick={handleAgregarOrigen}>Agregar Origen</Button>
          <Button variant="primary" onClick={handleAgregarDestino}>Agregar Destino</Button>

         {/* Mostrar coordenadas seleccionadas */}
         {coordenadas && (
            <div>
              <h2>Coordenadas de origen</h2>
              <ul>
                <li>Latitud: {coordenadas.lat}</li>
                <li>Longitud: {coordenadas.lng}</li>
              </ul>
            </div>
          )}

          {coordenadasDestino && (
            <div>
              <h2>Coordenadas de destino</h2>
              <ul>
                <li>Latitud: {coordenadasDestino.lat}</li>
                <li>Longitud: {coordenadasDestino.lng}</li>
              </ul>
            </div>
          )}
          </div>
          {/* Aquí puedes agregar otros campos para editar */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleEditarRuta}>Guardar Cambios</Button>
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
              <th>trafico</th>
              <th>clima </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rutas.map((ruta) => (
              <tr key={ruta.id}>
                <td>{ruta.id}</td>
                <td>{ruta.route_name}</td>
                <td>
                <TrafficInfo
        originLat={ruta.origin_lat}
        originLng={ruta.origin_lng}
        destinationLat={ruta.destination_lat}
        destinationLng={ruta.destination_lng}
      />
    </td>
    <td>  <WeatherInfo
                        lat={ruta.origin_lat}
                        lng={ruta.origin_lng}
                      /></td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleVerRuta(ruta)}>
                    <i className="fas fa-eye"></i> Ver
                  </button>
                  {userRole !== 'conductor' && (
        <>
          <button className="btn btn-warning me-2" onClick={() => { setRutaSeleccionada(ruta); setNombreRutaEditado(ruta.route_name); setShowEditModal(true); }}>
            <i className="fas fa-edit"></i> Editar
          </button>
          <button className="btn btn-danger" onClick={() => { setRutaSeleccionada(ruta); setShowDeleteModal(true); }}>
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
        </>
      )}
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

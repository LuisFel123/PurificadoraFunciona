import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../menu/menu";
import './cars.css'; // Importa el archivo de estilos CSS
import { Pagination, Modal, Button, Form } from 'react-bootstrap'; // Importa Pagination, Modal, Button y Form de react-bootstrap

function CarCrud() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({ model: '', capacity: '', img_url: '' });
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [totalItems, setTotalItems] = useState(0); // Estado para el número total de autos
  const [userRole, setUserRole] = useState(''); // Estado para el rol del usuario
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [editCarData, setEditCarData] = useState({ id: '', model: '', capacity: '', img_url: '' }); // Estado para almacenar los datos del carro a editar

  const carsPerPage = 5; // Número de autos por página
  const [showMessage, setShowMessage] = useState(false);
  const indexOfLastCar = currentPage * carsPerPage; // Índice del último auto en la página actual
  const indexOfFirstCar = indexOfLastCar - carsPerPage; // Índice del primer auto en la página actual
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar); // Autos que se mostrarán en la página actual

  useEffect(() => {
    fetchCars();
    const role = localStorage.getItem('role'); // Obtener el rol del usuario desde localStorage
    setUserRole(role);
  }, []);

  const fetchCars = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en que no haya un token disponible
      return;
    }
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/carros', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data);
      setTotalItems(response.data.length); // Establecer el número total de carros
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Manejar el caso en que no haya un token disponible
        return;
      }

      await axios.post('http://127.0.0.1:8000/api/carros', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowMessage(true);

      setFormData({ model: '', capacity: '', img_url: '' }); // Limpiar el formulario
      // Establecer temporizador para ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      fetchCars(); // Actualizar la lista de carros después de agregar uno nuevo
    } catch (error) {
      console.error('Error creating car:', error);
      alert('Error al crear el carro');
    }
  };

  const handleEdit = (car) => {
    setEditCarData(car);
    setShowModal(true);
  };

  const handleDelete = async (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en que no haya un token disponible
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este carro?");
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/carboy/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Eliminar el carro del estado después de una eliminación exitosa
      setCars(cars.filter(car => car.id !== carId));
      setTotalItems(totalItems - 1); // Actualizar el número total de autos
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Error al eliminar el carro');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, img_url: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditCarData({ ...editCarData, img_url: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditInputChange = (e) => {
    setEditCarData({ ...editCarData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Manejar el caso en que no haya un token disponible
      return;
    }

    try {
      await axios.put(`http://127.0.0.1:8000/api/carros/${editCarData.id}`, editCarData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModal(false);
      fetchCars(); // Actualizar la lista de carros después de editar uno
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Error al actualizar el carro');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Actualizar la página actual
  };

  return (
    <div>
      {showMessage && (
        <div className="message-container">
          <p className="message">Carro creado exitosamente!</p>
        </div>
      )}

      <Navbar />
      <div className="car-crud-container">
        <h1> Carros</h1>
        {userRole !== 'conductor' && (
          <div className="car-form-container">
            <form onSubmit={handleSubmit} className="car-form">
              <label htmlFor="model">Modelo:</label>
              <input type="text" id="model" name="model" value={formData.model} onChange={handleInputChange} required />
              <label htmlFor="capacity">Capacidad:</label>
              <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} required />
              <label htmlFor="img_url">Subir imagen:</label>
              <input type="file" id="img_url" name="img_url" onChange={handleImageUpload} accept="image/*" />
              <button type="submit" className="add-car-btn">Agregar Carro</button>
            </form>
          </div>
        )}
        {/* Tabla para mostrar los carros */}
        <table className="car-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Modelo</th>
              <th>Capacidad</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map(car => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.model}</td>
                <td>{car.capacity}</td>
                <td><img src={car.img_url} alt={car.model} className="car-image" /></td>
                <td>
                  {userRole !== 'conductor' && (
                    <>
                      <button onClick={() => handleEdit(car)} className="edit-btn">Editar</button>
                      <button onClick={() => handleDelete(car.id)} className="delete-btn">Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)} />
            {Array.from({ length: Math.ceil(totalItems / carsPerPage) }).map((_, idx) => (
              <Pagination.Item key={idx + 1} active={currentPage === idx + 1} onClick={() => handlePageChange(idx + 1)}>
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage < Math.ceil(totalItems / carsPerPage) ? currentPage + 1 : Math.ceil(totalItems / carsPerPage))} />
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(totalItems / carsPerPage))} />
          </Pagination>
        </div>
      </div>

      {/* Modal para editar carro */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Carro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editModel">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={editCarData.model}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editCapacity">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={editCarData.capacity}
                onChange={handleEditInputChange}
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CarCrud;

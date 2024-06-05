import React, { useEffect, useState } from 'react';
import Navbar from "../menu/menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pedidos.css'
const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [carboys, setCarboys] = useState([]);
  const [formData, setFormData] = useState({
    direccion_envio: '',
    
    productos: [{ carboy_id: '', cantidad: '' }],
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [insertMessage, setInsertMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [insertMessageType, setInsertMessageType] = useState('');

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/pedidos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Error fetching pedidos:', error));
    
    fetch('http://127.0.0.1:8000/api/getType', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setCarboys(data))
      .catch((error) => console.error('Error fetching carboys:', error));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = formData.productos.map((product, i) =>
      i === index ? { ...product, [name]: value } : product
    );
    setFormData({ ...formData, productos: updatedProducts });
  };

  const handleAddProduct = () => {
    setFormData({ ...formData, productos: [...formData.productos, { carboy_id: '', cantidad: '' }] });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: updatedProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editing ? `http://127.0.0.1:8000/api/pedidos/${currentId}` : 'http://127.0.0.1:8000/api/pedidos';
    const method = editing ? 'PUT' : 'POST';
  
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no pudo ser completada');
        }
        return response.json();
      })
      .then((data) => {
        if (editing) {
          setPedidos(pedidos.map((pedido) => (pedido.id === data.id ? data : pedido)));
          setInsertMessage('Pedido actualizado con éxito');
          setInsertMessageType('success');

        } else {
          setPedidos([...pedidos, data]);
          setInsertMessage('Pedido insertado con éxito');
          setInsertMessageType('success');

        }
        resetForm();
        setTimeout(() => setInsertMessage(''), 3000); // Ocultar mensaje después de 3 segundos
      })
      .catch((error) => {
        setInsertMessage('');
        if (error.message === 'La solicitud no pudo ser completada') {
          setInsertMessage('Hubo un error al procesar la solicitud, por favor intente nuevamente');
          setTimeout(() => setInsertMessage(''), 5000);
          setInsertMessageType('error');

        } else {
          console.error('Error saving pedido:', error);
        }
      });
  };
  

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/pedidos/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => {
        if (response.status === 204) {
          setPedidos(pedidos.filter((pedido) => pedido.id !== deleteId));
          setDeleteMessage('Pedido eliminado con éxito');
          setTimeout(() => setDeleteMessage(''), 3000); // Ocultar mensaje después de 3 segundos
          setShowConfirmModal(false);
          setInsertMessageType('success');

        }
      })
      .catch((error) => console.error('Error deleting pedido:', error));
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleEdit = (pedido) => {
    setFormData({
      direccion_envio: pedido.direccion_envio,
      
      productos: pedido.carboys.map((carboy) => ({
        carboy_id: carboy.id,
        cantidad: carboy.pivot.cantidad,
      })),
    });
    setEditing(true);
    setCurrentId(pedido.id);
  };

  const handleMarkAsRealized = (id) => {
    const pedido = pedidos.find(pedido => pedido.id === id);
    fetch(`http://127.0.0.1:8000/api/pedidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...pedido, estado: 'Realizado' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPedidos(pedidos.map((pedido) => (pedido.id === data.id ? data : pedido)));
        setInsertMessage('Pedido marcado como Realizado');
        setTimeout(() => setInsertMessage(''), 3000); // Ocultar mensaje después de 3 segundos
      })
      .catch((error) => console.error('Error updating pedido:', error));
  };

  const resetForm = () => {
    setFormData({
      direccion_envio: '',
     
      productos: [{ carboy_id: '', cantidad: '' }],
    });
    setEditing(false);
    setCurrentId(null);
  };
  const getMessageClassName = () => {
    if (insertMessageType === 'error') {
      return 'error-message';
    } else if (insertMessageType === 'success') {
      return 'success-message';
    }
    return ''; // Si no hay tipo de mensaje definido, devolver una cadena vacía
  };
  return (
    <div>      <Navbar />
        {userRole !== 'conductor' && (
        <>
         <div className="card tamano">
        <div className="card-header">
          <h1>{editing ? 'Editar Pedido' : 'Crear Pedido'}</h1>
        </div>
        <div className="card-body">
        <div className={`alert ${getMessageClassName()}`}>{insertMessage}</div>
      
          <form onSubmit={handleSubmit}>
          {formData.productos.map((product, index) => (
              <div key={index} className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor={`carboy_id_${index}`} className="form-label">Botes por cantidad</label>
                  <select
                    name="carboy_id"
                    value={product.carboy_id}
                    onChange={(e) => handleProductChange(index, e)}
                    className="form-select"
                  >
                    <option value="">Seleccione un Carboy</option>
                    {carboys.map((carboy) => (
                      <option key={carboy.id} value={carboy.id}>
                        {carboy.carboy_types.capacity}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor={`cantidad_${index}`} className="form-label">Cantidad</label>
                  <input name="cantidad" value={product.cantidad} onChange={(e) => handleProductChange(index, e)} className="form-control" placeholder="Cantidad" />
                </div>
                
              </div>
            ))}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="direccion_envio" className="form-label">Dirección de Envío</label>
                <input name="direccion_envio" value={formData.direccion_envio} onChange={handleChange} className="form-control" placeholder="Dirección de Envío" />
              </div>
              
            </div>
            
            <button type="button" onClick={handleAddProduct} className="btn btn-secondary mb-3">Añadir Producto</button>
            <button type="submit" className="btn btn-primary mb-3">{editing ? 'Actualizar' : 'Guardar'}</button>
            {editing && <button type="button" onClick={resetForm} className="btn btn-warning mb-3">Cancelar</button>}
          </form>
        </div>
      </div>
          </>
      )}
    <div className="container mt-5">
     

      <div className="mt-5">
        {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
        <h2>Lista de Pedidos</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Dirección de Envío</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.direccion_envio}</td>
                <td>{pedido.estado}</td>
                <td>
                {userRole !== 'conductor' && (
        <>

<button onClick={() => handleEdit(pedido)} className="btn btn-warning me-2">Editar</button>
                  <button onClick={() => confirmDelete(pedido.id)} className="btn btn-danger me-2">Eliminar</button>
 
          </>
      )}                 {pedido.estado !== 'Realizado' && (
        <button onClick={() => handleMarkAsRealized(pedido.id)} className="btn btn-success">Marcar como Realizado</button>
      )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>¿Está seguro de que desea eliminar este pedido?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Pedidos;

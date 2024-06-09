import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Para realizar solicitudes HTTP
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Estilos para el cuerpo de la página
const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: lightgray; 
`;

// Componente para el botón de Bootstrap
const StyledButton = styled.button`
  display: block;
  // margin: 0 auto 20px; /* Margen inferior de 20px y centrado horizontal */
`;

// Contenedor para los botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem; /* Espaciado entre los botones */
`;

// Contenedor para los botones superiores
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%; 
  margin: 0 auto;
  margin-bottom: 0.5rem;
`;

const FilterSelect = styled.select`
  width: 150px; /* Ancho del select */
`;

// Estilos para el título centrado
const Title = styled.h1`
text-align: center;
`;

// Componente para la tabla de Bootstrap
const BootstrapTable = styled.table`
width: 80%; 
margin: 0 auto; 
`;

// Estilos para el footer centrado en la parte inferior de la página
const Footer = styled.footer`
text-align: center;
margin-top: auto; /* Mueve el footer al final de la página */
background-color: white; 
`;

const BtnAgregarTarea = ({ onClick }) => {
  return (
    <div>
      <StyledButton className="btn btn-primary" onClick={onClick}>Agregar Tarea</StyledButton>
    </div>
  );
};
const Home = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('pendiente');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tareas, setTareas] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);    
  
  const [selectedValue, setSelectedValue] = useState('todo');

  const handleChange = async (event) => {
    const value = event.target.value; // Obtener el valor seleccionado del evento
    setSelectedValue(value); // Actualizar el valor seleccionado en el estado
    try {
      // Hacer una solicitud GET a la API con el valor seleccionado como parámetro de consulta
      const response = await axios.get(`/api/tareas?estado=${value}`);
      setTareas(response.data); // Actualizar el estado de las tareas con los datos recibidos
      } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };


  useEffect(() => {
    // Realizar una solicitud GET inicial para obtener todas las tareas
    const fetchTareas = async () => {
      try {
        const response = await axios.get('/api/tareas');
        setTareas(response.data); // Actualizar el estado de las tareas con los datos recibidos
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTareas(); // Llamar a la función al cargar el componente
  }, []); // La dependencia vacía asegura que esta solicitud solo se realice una vez al montar el componente

  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };




  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titulo.trim()) {
      setError('El título no puede estar vacío');
      return;
    } else {

      // Condicional para reutilizar el modal de agregado
      if (isEditing) {
        try {
          await axios.put(`/api/tareas/editar/${editId}`, { titulo, descripcion, estado });
          setSuccess('Tarea editada con éxito');
        } catch (error) {
          console.error('Error al editar la tarea:', error);
        }
      } else {
          try {
            await axios.post('/api/guardar-tarea', { titulo, descripcion });
            setSuccess('Tarea agregada con éxito');
          } catch (error) {
            setError('Error al guardar la tarea');
            console.error(error); 
          }
      }

      axios.get(`/api/tareas?estado=${selectedValue}`)
      .then(response => { setTareas(response.data); })
      .catch(error => { console.error('Error fetching data:', error); });

      setTitulo('');
      setDescripcion('');
      setEstado('pendiente');
      setError('');
      setIsEditing(false);
      setEditId(null);
      toggleModal();
      setTimeout(() => { setSuccess(''); }, 2000);
    }; // final de la validacion
  } // final del handleSubmit


    const completarTarea = async (id, selectedValue) => {
      try {
        await axios.patch(`/api/tareas/completar/${id}`);
        const response = await axios.get(`/api/tareas?estado=${selectedValue}`);
        setTareas(response.data);
        setSuccess('Tarea marcada como finalizada correctamente');
        setTimeout(() => {
               setSuccess('');
             }, 2000);
      } catch (error) {
        console.error('Error completing task:', error);
      }
    };
  
    const editTarea = (id) => {
      const tarea = tareas.find(t => t.id === id);
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcion);
      setEstado(tarea.estado);
      setIsEditing(true);
      setEditId(id);
      toggleModal();
    };

    const eliminarTarea = async (id) => {
      try {
        await axios.delete(`/api/tareas/eliminar/${id}`);
        // Aquí actualizamos las tareas después de eliminar una
        const response = await axios.get(`/api/tareas?estado=${selectedValue}`);
        setTareas(response.data);
        setSuccess('Tarea eliminada con éxito');
        setTimeout(() => {
          setSuccess('');
        }, 2000); 
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };




  return (    
    <Body>
      {success && <div className="alert alert-success" role="alert">{success}</div>}

      <Title>To-Do List</Title>
      <ButtonsContainer>
        <div>
          <BtnAgregarTarea onClick={() => {
            setIsEditing(false);
            setTitulo('');
            setDescripcion('');
            setEstado('pendiente');
            toggleModal();
          }} />
        </div>
        <div>
          <FilterSelect className="form-select" aria-label="Filtrar por estado" onChange={handleChange}>
            <option value="todo">Todo</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="completada">Completada</option>
          </FilterSelect>
        </div>
      </ButtonsContainer>
      
      <BootstrapTable className="table table-bordered text-center">
        <thead>
          <tr>
            <th className="col-1">ID</th>
            <th className="col-4">Tarea</th>
            <th className="col-4">Descripción</th>
            <th className="col-2">Estado</th>
            <th className="col-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {tareas.map(tarea => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.descripcion}</td>
              <td>
                <span className={`badge ${tarea.estado === 'pendiente' ? 'bg-secondary' : tarea.estado === 'en_proceso' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                  {tarea.estado.toUpperCase().replace("_", " ")}
                </span>
              </td>
              <td>
                <ButtonContainer>
                  <button className="btn btn-success btn-sm" onClick={() => completarTarea(tarea.id,selectedValue)}>
                    <i className="bi bi-check-circle"></i>
                  </button>
                  <button className="btn btn-warning btn-sm" onClick={() => editTarea(tarea.id,selectedValue)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarTarea(tarea.id,selectedValue)}>
                    <i className="bi bi-trash"></i>
                  </button>
                  </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>


      {modalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title">{isEditing ? 'Editar Tarea' : 'Agregar Tarea'}</h5>
              </div>

              <form onSubmit={handleSubmit}>
              <div className="modal-body">
              {/* input del titulo */}
              <div className="form-group">                
                  <label htmlFor="titulo">Título</label>
                  <input type="text" className={`form-control ${error && 'is-invalid'}`}
                      id="titulo" value={titulo} 
                      onChange={(e) => setTitulo(e.target.value)}
                  />
                      {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea className="form-control" id="descripcion" value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
              </div>

              {/* el modal se modifica en caso de edicion, para permitir cambios de estado */}
              {isEditing && (
                <div className="form-group">
                  <label htmlFor="estado">Estado</label>
                  <select
                    className="form-control" id="estado" value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="completada">Completada</option>
                  </select>
                </div>
              )}

              </div>
              <div className="modal-footer mt-2">
              <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Actualizar' : 'Agregar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
              </div>
                </form>
            </div>
          </div>
        </div>
      )}

      <Footer>Ing. Mauricio Ramirez Samudio</Footer>
    </Body>
  );
};

export default Home;

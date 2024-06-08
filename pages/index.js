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
  margin: 0 auto 20px; /* Margen inferior de 20px y centrado horizontal */
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

const Home = () => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [titulo, setTitle] = useState('');
  const [descripcion, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    axios.get('/api/tareas')
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!titulo.trim()) {
      setError('El título no puede estar vacío');
      return;
    } else {
      // Aquí puedes hacer algo con los valores de title y descripcion, como enviarlos a un servidor
      // alert(`Tarea agregada: ${title} - ${descripcion}`);
    
      try {
        // Realizar una solicitud POST al servidor para guardar los datos
        await axios.post('/api/guardar-tarea', { titulo, descripcion });
      setSuccess('Tarea agregada con éxito');

      // Realiza una nueva solicitud para obtener los datos actualizados de las tareas
      axios.get('/api/tareas')
      .then(response => {
        setTareas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      setTitle(''); // Limpia los campos después de enviar el formulario
      setDescription('');
      setError('');
      toggleModal(); // Cierra el modal después de enviar el formulario
      setTimeout(() => {
        setSuccess('');
      }, 2000); // Cierra el mensaje de éxito después de 2 segundos (2000 milisegundos)
      } catch (error) {
        setError('Error al guardar la tarea');
        console.error(error); 
      }
    };
  
      
      
      

    }








  return (    
    <Body>
      {success && <div className="alert alert-success" role="alert">{success}</div>}

      <Title>To-Do List</Title>
      <StyledButton className="btn btn-primary" onClick={toggleModal}>Agregar Tarea</StyledButton>
      <BootstrapTable className="table table-bordered text-center">
        <thead>
          <tr>
            <th className="col-1">ID</th>
            <th className="col-4">Tarea</th>
            <th className="col-4">Descripción</th>
            <th className="col-1">Estado</th>
            <th className="col-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
        {tareas.map(tarea => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.estado}</td>
              <td>..</td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>


      {modalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Tarea</h5>              
              </div>

              <form onSubmit={handleSubmit}>
              <div className="modal-body">
              {/* input del titulo */}
              <div className="form-group">                
                  <label htmlFor="titulo">Título</label>
                  <input type="text" className={`form-control ${error ? 'is-invalid' : ''}`} 
                    id="titulo" value={titulo} onChange={(e) => setTitle(e.target.value)}/>
                    {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescription(e.target.value)} />
              </div>


              </div>
              <div className="modal-footer mt-2">
                <button type="submit" className="btn btn-primary">Agregar</button>
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

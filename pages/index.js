import React, { useState } from 'react';

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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');


  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('El título no puede estar vacío');
      return;
    } else {
      // Aquí puedes hacer algo con los valores de title y description, como enviarlos a un servidor
      alert(`Tarea agregada: ${title} - ${description}`);
      setTitle(''); // Limpia los campos después de enviar el formulario
      setDescription('');
      setError('');
      toggleModal(); // Cierra el modal después de enviar el formulario
    }
  };


  return (    
    <Body>      
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
          {/* Aquí puedes agregar filas de tu tabla */}
        </tbody>
      </BootstrapTable>


      {modalOpen && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 class="modal-title">Agregar Tarea</h5>              
              </div>
              <form onSubmit={handleSubmit}>
              <div className="modal-body">

              {/* input del titulo */}
              <div className="form-group">                
                  <label htmlFor="title">Título</label>
                  <input type="text" className={`form-control ${error ? 'is-invalid' : ''}`} 
                    id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    {error && <div className="invalid-feedback">{error}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>


              </div>
              <div class="modal-footer mt-2">
                <button type="submit" className="btn btn-primary">Agregar</button>
                <button type="button" class="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
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

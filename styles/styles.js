import styled from 'styled-components';

// Estilos para el cuerpo de la página
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: lightgray; 
`;

// Estilos para la alerta fija
export const FixedAlert = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 1000;
`;

// Componente para el botón de Bootstrap
export const StyledButton = styled.button`
  display: block;
`;

// Contenedor para los botones
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem; /* Espaciado entre los botones */
`;

// Contenedor para los botones superiores
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%; 
  margin: 0 auto;
  margin-bottom: 0.5rem;
`;

export const FilterSelect = styled.select`
  width: 150px; /* Ancho del select */
`;

// Estilos para el título centrado
export const Title = styled.h1`
  text-align: center;
  margin-top: 1rem;
`;

// Componente para la tabla de Bootstrap
export const BootstrapTable = styled.table`
  margin: 0 auto; 
`;

export const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  overflow-x: auto;
`;

// Estilos para el footer centrado en la parte inferior de la página
export const Footer = styled.footer`
  text-align: center;
  margin-top: auto; /* Mueve el footer al final de la página */
  background-color: white; 
`;

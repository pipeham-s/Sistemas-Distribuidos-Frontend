import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // Header se importa aquí y se usa solo una vez
import SolicitarMateria from '../components/SolicitarMateria'; // Importa el componente de solicitud de materia
import SolicitarClase from '../components/SolicitarClase';
import backgroundImage from '../images/universidad.jpg'; // Ruta correcta a la imagen de fondo

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage}); /* Aplica la imagen de fondo */
  background-size: cover; /* La imagen cubre todo el contenedor */
  background-repeat: no-repeat; /* Evita repeticiones */
  background-position: center; /* Centra la imagen en el contenedor */
  height: 100vh; /* Altura completa de la pantalla */
  width: 100vw; /* Ancho completo de la pantalla */
  margin: 0; /* Elimina los márgenes */
  padding: 0; /* Elimina el padding */
  overflow: hidden; /* Evita que aparezcan scrolls */
`;

const Home = () => {
  return (
    <PageContainer>
      <Header /> {/* Renderiza el header solo una vez */}
      <SolicitarMateria /> {/* Agrega el componente SolicitarMateria aquí */}
      <SolicitarClase /> 
    </PageContainer>
  );
};

export default Home;

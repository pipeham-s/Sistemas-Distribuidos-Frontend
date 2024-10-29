// src/pages/Home.js

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SolicitarMateria from '../components/SolicitarMateria';
import SolicitarClase from '../components/SolicitarClase';
import backgroundImage from '../images/universidad.jpg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh; /* Ocupa al menos toda la altura de la pantalla */
  width: 100%;
  margin: 0;
  padding: 0 20px;   /* Padding horizontal para espacio lateral */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px; /* Ancho máximo para el contenido */
  padding-top: 80px; /* Espacio superior para evitar solapamiento con el header */
`;

const Home = () => {
  return (
    <PageContainer>
      <Header /> {/* Asegúrate de que este componente está bien implementado */}
      <ContentWrapper>
        <SolicitarMateria />
        <SolicitarClase />
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;

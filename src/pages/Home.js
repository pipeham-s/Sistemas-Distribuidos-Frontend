// src/pages/Home.js

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SolicitarMateria from '../components/SolicitarMateria';
import SolicitarClase from '../components/SolicitarClase';
import MisClases from '../components/MisClases';
import SolicitudesClasesPendientes from '../components/SolicitudesClasesPendientes'; // Asegúrate de esta ruta
import backgroundImage from '../images/universidad.jpg';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;  /* Ajuste de tamaño para centrar bien */
  height: 100%;  /* Tomar toda la altura disponible */
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Home = () => {
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <SolicitarMateria />
        <SolicitarClase />
        <MisClases />
        <SolicitudesClasesPendientes /> {/* Verifica la importación y exportación de este componente */}
      </ContentWrapper>
    </PageContainer>
  );
};

export default Home;

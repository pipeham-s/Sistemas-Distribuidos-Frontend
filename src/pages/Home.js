// src/pages/Home.js

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import SolicitarMateria from '../components/SolicitarMateria';
import SolicitarClase from '../components/SolicitarClase';
import MisClases from '../components/MisClases';
import Notificaciones from '../components/Notificaciones';
import SolicitudesClasesPendientes from '../components/SolicitudesClasesPendientes';
import backgroundImage from '../images/universidad.jpg';

// Contenedor de la página
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

// Contenedor principal que divide la pantalla en dos columnas
const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

// Sección izquierda para el componente de notificaciones
const LeftSection = styled.div`
  flex: 1;
  max-width: 40%;
  min-width: 350px;
  margin-top: 60px;
`;

// Sección derecha para los botones de acciones
const RightSection = styled.div`
  flex: 1;
  max-width: 40%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 60px;
`;

const Home = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        {/* Sección izquierda con el componente de notificaciones */}
        <LeftSection>
          <Notificaciones />
        </LeftSection>

        {/* Sección derecha con los botones de acciones */}
        <RightSection>
          <SolicitarMateria />
          <SolicitarClase />
          <MisClases />
          <SolicitudesClasesPendientes />
        </RightSection>
      </MainContent>
    </PageContainer>
  );
};

export default Home;

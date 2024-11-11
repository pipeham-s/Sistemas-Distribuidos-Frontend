import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import backgroundImage from '../images/universidad.jpg';
import SolicitudesPendientes from '../components/SolicitudesPendientes';
import GestionMaterias from '../components/GestionMaterias';

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
  max-width: 1000px;  /* Ajuste de tamaño */
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const AdminPage = () => {
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <SolicitudesPendientes/>
        <GestionMaterias/>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdminPage;

// src/components/Home.js
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // Header se importa aquí y se usa solo una vez
import backgroundImage from '../images/universidad.jpg'; // Ruta relativa de la imagen

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const HomeImageContainer = styled.div`
  margin-top: 20px;
`;

const Image = styled.img`
  max-width: 80%;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header /> {/* Componente de encabezado */}
      <HomeImageContainer>
      </HomeImageContainer>
    </HomeContainer>
  );
};

export default Home;

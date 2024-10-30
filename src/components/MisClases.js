// src/components/MisClases.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Estilos principales
const Box = styled.div`
  background-color: rgba(130, 201, 177, 0.7);
  padding: 20px;
  margin: 15px 0; /* Margen uniforme entre las cajas */
  border-radius: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;  /* Ancho uniforme */
  height: 150px;  /* Altura ajustada */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTitle = styled.h2`
  color: black;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
`;

const GreenButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 18px;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const MisClases = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/mis-clases');
  };

  return (
    <Box>
      <StyledTitle>Mis Clases</StyledTitle>
      <GreenButton onClick={handleNavigate}>Ver Mis Clases</GreenButton>
    </Box>
  );
};

export default MisClases;
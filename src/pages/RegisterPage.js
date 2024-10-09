// src/pages/RegisterPage.js

import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/fondoprofesor.jpg';
import Registro from '../components/Registro'
import Header from '../components/Header'; // Asegúrate de que Header esté correctamente importado

const PageContainer = styled.div`
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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9); // Fondo blanco semitransparente para el formulario
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Sombra para resaltar el contenedor
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const RegisterPage = () => {
  return (
    <PageContainer>
      <Header />
      <Registro /> {/* Componente de formulario de registro */}
    </PageContainer>
  );
};

export default RegisterPage;

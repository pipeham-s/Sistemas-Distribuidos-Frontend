import React from 'react';
import styled from 'styled-components';
import Login from '../components/Login';
import Header from '../components/Header'; // Header se importa aquí y se usa solo una vez
import backgroundImage from '../images/universidad.jpg'; // Ruta correcta a la imagen de fondo

// Contenedor principal de la página con el fondo de la imagen
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

// Contenedor para centrar el Login
const LoginBox = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco semitransparente */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px; /* Ancho fijo para el contenedor de login */
  height: 350px; /* Altura fija para el cuadro del login */
  z-index: 1; /* Asegura que el contenedor esté encima de la imagen de fondo */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LoginPage = () => {
  return (
    <PageContainer>
      <Header /> {/* Renderiza el header solo una vez */}
    
           <Login />
      
    </PageContainer>
  );
};

export default LoginPage;

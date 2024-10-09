import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

// Contenedor principal del Login con estilo traslúcido
const LoginContainer = styled.div`
  background-color: rgba(130, 201, 177, 0.8); /* Verde traslúcido */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
  width: 100%; /* Ancho del contenedor */
  max-width: 400px; /* Ancho máximo */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.95; /* Opacidad adicional para mayor traslucidez */
  border: 1px solid rgba(130, 201, 177, 0.5); /* Borde verde traslúcido */
`;

// Contenedor de los Links
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Alinea los elementos a los extremos */
  width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
  margin-top: 1rem; /* Espacio entre los links y el botón */
`;

// Estilo para cada link individual - cambiamos el nombre a StyledLink
const StyledLink = styled(Link)` // Usamos Link desde react-router-dom
  color: #6C3B2A;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Estilo para los Inputs
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Estilo para el Botón
const Button = styled.button`
  background-color: #6C3B2A; /* Color de fondo del botón */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  border: 1px solid #6C3B2A;
  width: 106%; /* Hace que el botón ocupe el 100% del ancho del contenedor */

  &:hover {
    background-color: #45a049; /* Color del botón al hacer hover */
  }
`;

const Login = () => {
  return (
    <LoginContainer>
      <h2>Iniciar Sesión</h2>
      <Input type="email" placeholder="Correo electrónico" />
      <Input type="password" placeholder="Contraseña" />
      <Button>Iniciar Sesión</Button>

      {/* Contenedor para los links */}
      <LinksContainer>
        {/* Cambia href="#" por "to="/register"" y utiliza StyledLink */}
        <StyledLink to="/register">Crear una cuenta</StyledLink>
        <StyledLink to="#">Olvidé mi contraseña</StyledLink>
      </LinksContainer>
    </LoginContainer>
  );
};

export default Login;


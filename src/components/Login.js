import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios para la solicitud

// Contenedor principal del Login con estilo traslúcido
const LoginContainer = styled.div`
  background-color: rgba(130, 201, 177, 0.8);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.95;
  border: 1px solid rgba(130, 201, 177, 0.5);
`;

// Contenedor de los Links
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

// Estilo para cada link individual
const StyledLink = styled(Link)`
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
  background-color: #6C3B2A;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  border: 1px solid #6C3B2A;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = () => {
  // Definir el estado para almacenar el correo y la contraseña
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Reemplazar useHistory por useNavigate

  // Función para manejar el submit del formulario
  const handleLogin = async () => {
    try {
      // Imprimir en consola para verificar los valores antes de la solicitud
      console.log('Iniciando sesión con:', { correo, contrasena });

      // Realizar la solicitud POST enviando los valores como JSON
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: correo,  // Enviar correo como username
        password: contrasena // Enviar contrasena como password
      });

      // Manejar la respuesta del backend
      if (response.status === 200) {
        const token = response.data.token; // Obtener el token desde la respuesta
        localStorage.setItem('token', token); // Guardar el token en localStorage
        setMensaje('Inicio de sesión exitoso');
        navigate('/home'); // Navegar a la página principal
      } else if (response.status === 404) {
        setMensaje('Usuario no encontrado');
      } else if (response.status === 401) {
        setMensaje('Contraseña incorrecta');
       } else if (response.status === 403) {
          setMensaje('axios de verga');
          
        
      } else {
        setMensaje('Error en el sistema, intenta más tarde');
      }
    } catch (error) {
      // Manejo de errores de red o respuesta del servidor
      if (error.response) {
        if (error.response.status === 404) {
          setMensaje('Usuario no encontrado');
        } else if (error.response.status === 401) {
          setMensaje('Contraseña incorrecta');
        } else {
          setMensaje('Error en el sistema, intenta más tarde');
        }
      } else {
        setMensaje('Error en la conexión con el servidor');
      }
    }
  };

  return (
    <LoginContainer>
      <h2>Iniciar Sesión</h2>
      {/* Inputs controlados */}
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      {/* Botón que llama a handleLogin */}
      <Button onClick={handleLogin}>Iniciar Sesión</Button>

      {/* Mensaje de estado de inicio de sesión */}
      {mensaje && <p>{mensaje}</p>}

      {/* Contenedor para los links */}
      <LinksContainer>
        <StyledLink to="/register">Crear una cuenta</StyledLink>
        <StyledLink to="#">Olvidé mi contraseña</StyledLink>
      </LinksContainer>
    </LoginContainer>
  );
};

export default Login;

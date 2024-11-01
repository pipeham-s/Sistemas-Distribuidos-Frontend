import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #6C3B2A;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Iniciando sesión con:', { correo, contrasena });
      
      const response = await axios.post('http://localhost:8080/auth/login', {
        username: correo,
        password: contrasena,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        setMensaje('Inicio de sesión exitoso');
        
        const decodedToken = jwtDecode(token); // Usando jwtDecode
        const role = decodedToken.role;
        const cedula = decodedToken.cedula;
        console.log("cedula: " + cedula)
        localStorage.setItem('cedula', cedula);
        console.log(role)// Asegúrate de que el rol se llama "role" en tu token

        // Redirigir basado en el rol del usuario
        if (role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setMensaje('Error en el sistema, intenta más tarde');
      }
    } catch (error) {
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
      <Button onClick={handleLogin}>Iniciar Sesión</Button>
      {mensaje && <p>{mensaje}</p>}
      <LinksContainer>
        <StyledLink to="/register">Crear una cuenta</StyledLink>
        <StyledLink to="#">Olvidé mi contraseña</StyledLink>
      </LinksContainer>
    </LoginContainer>
  );
};

export default Login;

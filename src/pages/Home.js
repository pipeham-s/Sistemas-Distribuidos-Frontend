import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Componente principal Home
const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  // Función para obtener los datos del usuario usando el token JWT
  const obtenerDatosUsuario = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage

      if (!token) {
        setMensajeError('No se encontró un token, por favor inicia sesión.');
        return;
      }

      // Enviar solicitud GET con el token en los headers
      const response = await axios.get('http://localhost:8080/auth/me', {
        headers: {
          Authorization: `Bearer ${token}` // Incluir el token en los headers
        }
      });

      setUsuario(response.data); // Guardar los datos del usuario en el estado
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      setMensajeError('Hubo un error al obtener los datos del usuario. Verifica si el token es válido.');
    }
  };

  // Obtener los datos del usuario cuando el componente se monta
  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  return (
    <div>
      <h1>Bienvenido a la página Home</h1>

      {mensajeError && <p>{mensajeError}</p>}

      {usuario ? (
        <div>
          <h2>Datos del usuario autenticado:</h2>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Apellido:</strong> {usuario.apellido}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Cédula:</strong> {usuario.cedula}</p>
        </div>
      ) : (
        <p>Cargando los datos del usuario...</p>
      )}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Animación fadeIn para la lista de solicitudes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Estilo del contenedor principal
const Box = styled.div`
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  padding: 25px;
  width: 350px;
  margin: 15px;
  color: #333;
  transition: transform 0.4s, box-shadow 0.4s, border-bottom 0.4s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  animation: ${fadeIn} 1.5s ease-in;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
    border-bottom: 4px solid #4caf50;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 15px;
  text-align: center;
`;

const GreenButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.4s, transform 0.3s;
  color: #fff;
  outline: none;
  position: relative;
  overflow: hidden;
  background: #4caf50;
  margin-top: 20px;

  &:hover {
    background: #388e3c;
    transform: scale(1.05);
  }
`;

const RedButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.4s, transform 0.3s;
  color: #fff;
  outline: none;
  position: relative;
  overflow: hidden;
  background: #f44336;
  margin-left: 10px;

  &:hover {
    background: #d32f2f;
    transform: scale(1.05);
  }
`;

const customStyles = {
  content: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '25px',
    borderRadius: '20px',
    border: 'none',
    background: 'linear-gradient(135deg, #ffffff, #e0e0e0)',
    boxSizing: 'border-box',
    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.6)',
    maxWidth: '800px',
    width: '90%',
    overflow: 'auto',
    textAlign: 'center',
    maxHeight: 'fit-content',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

// Tabla
const TablaSolicitudes = styled.div`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
`;

const TablaWrapper = styled.div`
  max-height: 40vh;
  overflow-y: auto;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4caf50;
    border-radius: 10px;
  }
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TablaHeader = styled.thead`
  background: #4caf50;
  color: #ffffff;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TablaRow = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const TablaHeaderCell = styled.th`
  padding: 15px;
`;

const TablaCell = styled.td`
  padding: 15px;
  text-align: left;
`;

const SolicitudesClasesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Función para obtener las solicitudes pendientes del backend
    const fetchSolicitudes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no disponible');
        return;
      }

      let decodedToken;
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/solicitud-clase/pendientes/profesor${decodedToken.cedula}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes de clases pendientes:', error);
      }
    };

    // Llamar a la función por primera vez
    fetchSolicitudes();
  }, []);

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  // Función para aceptar solicitud
  const aceptarSolicitud = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return;
    }

    try {
      console.log(`Intentando aceptar solicitud con ID: ${id}`);
      const response = await axios.post(`http://localhost:8080/api/solicitud-clase/aceptar/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Respuesta del servidor:', response.data);
      setSolicitudes((prevSolicitudes) => prevSolicitudes.filter((solicitud) => solicitud.id !== id));
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor al aceptar la solicitud:', error.response.data);
      } else {
        console.error('Error inesperado al aceptar la solicitud:', error);
      }
    }
  };

  // Función para rechazar solicitud
  const rechazarSolicitud = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return;
    }

    try {
      console.log(`Intentando rechazar solicitud con ID: ${id}`);
      const response = await axios.post(`http://localhost:8080/api/solicitud-clase/rechazar/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Respuesta del servidor:', response.data);
      setSolicitudes((prevSolicitudes) => prevSolicitudes.filter((solicitud) => solicitud.id !== id));
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor al rechazar la solicitud:', error.response.data);
      } else {
        console.error('Error inesperado al rechazar la solicitud:', error);
      }
    }
  };

  return (
    <Box>
      <HeaderStyled>
        <StyledTitle>Alumnos que quieren mis servicios</StyledTitle>
        <GreenButton onClick={abrirModal}>Ver mis solicitudes</GreenButton>
      </HeaderStyled>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cerrarModal}
        contentLabel="Detalles de las Solicitudes"
        style={customStyles}
        ariaHideApp={false}
      >
        {solicitudes.length > 0 ? (
          <TablaSolicitudes>
            <TablaWrapper>
              <Tabla>
                <TablaHeader>
                  <TablaRow>
                    <TablaHeaderCell>Materia</TablaHeaderCell>
                    <TablaHeaderCell>Alumno</TablaHeaderCell>
                    <TablaHeaderCell>Fecha Solicitud</TablaHeaderCell>
                    <TablaHeaderCell>Acciones</TablaHeaderCell>
                  </TablaRow>
                </TablaHeader>
                <tbody>
                  {solicitudes.map((solicitud, index) => (
                    <TablaRow key={index} classname='overflow-y-scroll'>
                      <TablaCell>{solicitud.materia.nombre}</TablaCell>
                      <TablaCell>{solicitud.alumno.nombre + ' ' + solicitud.alumno.apellido}</TablaCell>
                      <TablaCell>{new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES')}</TablaCell>
                      <TablaCell>
                        <GreenButton onClick={() => aceptarSolicitud(solicitud.id)}>Aceptar</GreenButton>
                        <RedButton onClick={() => rechazarSolicitud(solicitud.id)}>Rechazar</RedButton>
                      </TablaCell>
                    </TablaRow>
                  ))}
                </tbody>
              </Tabla>
            </TablaWrapper>
          </TablaSolicitudes>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay solicitudes pendientes.</p>
        )}
        <GreenButton onClick={cerrarModal}>Cerrar</GreenButton>
      </Modal>
    </Box>
  );
};

export default SolicitudesClasesPendientes;

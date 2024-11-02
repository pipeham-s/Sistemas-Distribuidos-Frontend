// src/components/SolicitudesClasesPendientes.js

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

const SolicitudItem = styled.div`
  background-color: rgba(130, 201, 177, 0.2);
  border: 2px solid #4caf50;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const SolicitudDetails = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #333;
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
    maxWidth: '400px',
    width: '90%',
    overflow: 'auto',
    textAlign: 'center',
    maxHeight: 'fit-content',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const SolicitudesClasesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  useEffect(() => {
    // Obtener las solicitudes pendientes del backend
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/solicitudes-clases/pendientes');
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes de clases pendientes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const abrirModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setSelectedSolicitud(null);
  };

  return (
    <Box>
      <HeaderStyled>
        <StyledTitle>Solicitudes de Clases Pendientes</StyledTitle>
        <GreenButton onClick={() => abrirModal(null)}>Ver mis solicitudes</GreenButton>
      </HeaderStyled>
      {solicitudes.map((solicitud, index) => (
        <SolicitudItem key={index} onClick={() => abrirModal(solicitud)}>
          <SolicitudDetails><strong>Materia:</strong> {solicitud.materia}</SolicitudDetails>
          <SolicitudDetails><strong>Profesor:</strong> {solicitud.profesor}</SolicitudDetails>
          <SolicitudDetails><strong>Fecha:</strong> {solicitud.fecha}</SolicitudDetails>
          <SolicitudDetails><strong>Hora:</strong> {solicitud.hora}</SolicitudDetails>
        </SolicitudItem>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cerrarModal}
        contentLabel="Detalles de la Solicitud"
        style={customStyles}
        ariaHideApp={false}
      >
        {selectedSolicitud ? (
          <div>
            <h3>Detalles de la Solicitud</h3>
            <SolicitudDetails><strong>Materia:</strong> {selectedSolicitud.materia}</SolicitudDetails>
            <SolicitudDetails><strong>Profesor:</strong> {selectedSolicitud.profesor}</SolicitudDetails>
            <SolicitudDetails><strong>Fecha:</strong> {selectedSolicitud.fecha}</SolicitudDetails>
            <SolicitudDetails><strong>Hora:</strong> {selectedSolicitud.hora}</SolicitudDetails>
            <GreenButton onClick={cerrarModal}>Cerrar</GreenButton>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay detalles disponibles.</p>
        )}
      </Modal>
    </Box>
  );
};

export default SolicitudesClasesPendientes;

// src/components/SolicitarClase.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled, { keyframes, css } from 'styled-components';

// Animación fadeIn similar al primer componente
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Estilo del contenedor principal, similar a SolicitudCard
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
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: center;
`;

// Botón estilo similar a los de aceptar/rechazar
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

  &.solicitar {
    background: #4caf50;
  }
  &.solicitar:hover {
    background: #388e3c;
    transform: scale(1.05);
  }

  &.cancelar {
    background: #f44336;
  }
  &.cancelar:hover {
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
    maxWidth: '400px',
    width: '90%',
    overflow: 'auto',
    textAlign: 'center',
    maxHeight: 'fit-content', // Ajusta la altura máxima para evitar el espacio extra
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const SolicitarClase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [selectedHora, setSelectedHora] = useState('');

  const materias = [
    'Matemática',
    'Física',
    'Química',
    'Historia',
    'Lengua',
    'Biología',
    'Geografía',
  ];

  const profesores = ['Profesor A', 'Profesor B', 'Profesor C', 'Profesor D'];

  const horas = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
  ];

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleSolicitud = (event) => {
    event.preventDefault();
    console.log('Clase seleccionada:', {
      materia: selectedMateria,
      profesor: selectedProfesor,
      hora: selectedHora,
    });
    cerrarModal();
  };

  return (
    <Box>
      <HeaderStyled>
        <StyledTitle>Solicitar una clase</StyledTitle>
        <GreenButton className="solicitar" onClick={abrirModal}>Solicitar Clase</GreenButton>
      </HeaderStyled>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cerrarModal}
        contentLabel="Solicitud de Clase"
        style={customStyles}
        ariaHideApp={false}
      >
        <h3 style={{ marginBottom: '10px' }}>Completa la solicitud de clase</h3>
        <form onSubmit={handleSolicitud}>
          <label style={{ display: 'block', marginBottom: '15px', textAlign: 'left' }}>
            Nombre de la materia:
            <select
              required
              value={selectedMateria}
              onChange={(e) => setSelectedMateria(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="" disabled>
                Seleccione una materia
              </option>
              {materias.map((materia, index) => (
                <option key={index} value={materia}>
                  {materia}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: '15px', textAlign: 'left' }}>
            Profesor:
            <select
              required
              value={selectedProfesor}
              onChange={(e) => setSelectedProfesor(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="" disabled>
                Seleccione un profesor
              </option>
              {profesores.map((profesor, index) => (
                <option key={index} value={profesor}>
                  {profesor}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: '15px', textAlign: 'left' }}>
            Hora:
            <select
              required
              value={selectedHora}
              onChange={(e) => setSelectedHora(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="" disabled>
                Seleccione una hora
              </option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GreenButton className="solicitar" type="submit">Enviar solicitud</GreenButton>
            <GreenButton className="cancelar" type="button" onClick={cerrarModal}>
              Cancelar
            </GreenButton>
          </div>
        </form>
      </Modal>
    </Box>
  );
};

export default SolicitarClase;
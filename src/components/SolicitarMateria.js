// src/components/SolicitarMateria.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// Estilos principales
const Box = styled.div`
  background-color: rgba(130, 201, 177, 0.7);
  padding: 20px;
  margin: 20px 0; /* Margen vertical entre cajas */
  border-radius: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: column; /* Título y botón uno debajo del otro */
  align-items: center;
  width: 100%;
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

const customStyles = {
  content: {
    position: 'relative',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid black',
    backgroundColor: 'rgba(130, 201, 177, 0.9)',
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '90%',
    overflow: 'auto', /* Cambiado a 'auto' para evitar overflow */
    textAlign: 'center',
    margin: 'auto',
    maxHeight: '90vh', /* Limita la altura máxima del modal */
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const SolicitarMateria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState('');

  const materias = [
    'Matemática',
    'Física',
    'Química',
    'Historia',
    'Lengua',
    'Biología',
    'Geografía',
  ];

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleSolicitud = (event) => {
    event.preventDefault();
    console.log('Materia seleccionada:', selectedMateria);
    cerrarModal();
  };

  return (
    <Box>
      <HeaderStyled>
        <StyledTitle>Solicitar una materia profesor</StyledTitle>
        <GreenButton onClick={abrirModal}>Solicitar</GreenButton>
      </HeaderStyled>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cerrarModal}
        contentLabel="Solicitud de Materia"
        style={customStyles}
        ariaHideApp={false}
      >
        <h3 style={{ marginBottom: '10px' }}>Completa la solicitud de materia</h3>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GreenButton type="submit">Enviar solicitud</GreenButton>
            <GreenButton type="button" onClick={cerrarModal}>
              Cancelar
            </GreenButton>
          </div>
        </form>
      </Modal>
    </Box>
  );
};

export default SolicitarMateria;

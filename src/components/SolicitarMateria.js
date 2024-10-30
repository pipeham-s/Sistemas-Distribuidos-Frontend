// src/components/SolicitarMateria.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';


const Box = styled.div`
  background-color: rgba(130, 201, 177, 0.7);
  padding: 20px;
  margin: 15px 0; /* Margen reducido para igualar el espacio entre las cajas */
  border-radius: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;  /* Ancho uniforme */
  height: 150px;  /* Altura fija reducida */
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
    position: 'fixed', // Mantener el modal centrado
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid black',
    backgroundColor: 'rgba(130, 201, 177, 0.9)',
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '90%',
    overflow: 'auto',
    textAlign: 'center',
    maxHeight: 'fit-content', // Reducir la altura máxima del modal
    minHeight: 'fit-content', // Cambiar la altura mínima a 'auto' para adaptarse al contenido
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

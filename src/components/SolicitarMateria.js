import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'; // Para manejar los estilos

// Estilos principales
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const Box = styled.div`
  background-color: rgba(130, 201, 177, 0.7);
  padding: 20px;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledTitle = styled.h2`
  color: black;
  font-size: 24px;
  margin-bottom: 10px;
`;

const GreenButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
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
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    overflow: 'hidden',
    display: 'inline-block',
    textAlign: 'center',
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    minHeight: '100vh',
  },
};

const SolicitarMateria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState(''); // Estado para la materia seleccionada

  const materias = [
    'Matemática',
    'Física',
    'Química',
    'Historia',
    'Lengua',
    'Biología',
    'Geografía',
  ]; // Lista de materias disponibles

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleSolicitud = (event) => {
    event.preventDefault();
    console.log("Materia seleccionada:", selectedMateria);
    cerrarModal();
  };

  return (
    <Container>
      <Box>
        <Header>
          <StyledTitle>Solicitar una materia profesor</StyledTitle>
          <GreenButton onClick={abrirModal}>Solicitar</GreenButton>
        </Header>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={cerrarModal}
          contentLabel="Solicitud de Materia"
          style={customStyles}
        >
          <h3 style={{ marginBottom: '10px' }}>Completa la solicitud de materia</h3>
          <form onSubmit={handleSolicitud} style={{ width: '100%', margin: '0', padding: '0' }}>
            <label style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>
              Nombre de la materia:
              <select
                required
                value={selectedMateria}
                onChange={(e) => setSelectedMateria(e.target.value)}
                style={{ width: '100%', padding: '5px', marginTop: '5px' }}
              >
                <option value="" disabled>Seleccione una materia</option>
                {materias.map((materia, index) => (
                  <option key={index} value={materia}>
                    {materia}
                  </option>
                ))}
              </select>
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <GreenButton type="submit">Enviar solicitud</GreenButton>
              <GreenButton type="button" onClick={cerrarModal}>Cancelar</GreenButton>
            </div>
          </form>
        </Modal>
      </Box>
    </Container>
  );
};

export default SolicitarMateria;

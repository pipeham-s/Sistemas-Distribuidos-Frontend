// src/components/SolicitarMateria.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Animación fadeIn similar al primer componente
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
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: center;
`;

// Botón estilizado similar a SolicitarClase
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
    maxHeight: 'fit-content',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const SolicitarMateria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    // Obtener las materias del backend
    const fetchMaterias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/materias/todas');
        setMaterias(response.data);
      } catch (error) {
        console.error('Error al obtener las materias:', error);
      }
    };

    fetchMaterias();
  }, []);

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleSolicitud = (event) => {
    event.preventDefault();
    console.log('Materia seleccionada:', selectedMateria);
    enviarSolicitud();
  };

  const enviarSolicitud = async () => {
    //const userString = localStorage.getItem('user');
    //console.log("Contenido de 'user' en local storage:", userString);

    //const parsedUserString = JSON.parse(userString);
    //const user = JSON.parse(parsedUserString.value);

    //console.log('Objeto user parseado:', user);

    const cedulaUsuario = localStorage.getItem('cedula');

    if (!cedulaUsuario) {
      console.error('No se encontró la cédula del usuario en el objeto user.');
      alert('Error al obtener la cédula del ofertante.');
      return;
    }

    const payload = {
      cedulaUsuario: cedulaUsuario,
      nombreMateria: selectedMateria.trim(),
    };
    console.log('Payload enviado:', payload);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/solicitud-materia/crear',
        payload
      );

      if (response.status === 200) {
        console.log('Solicitud enviada correctamente');
        alert('Solicitud enviada correctamente');
      } else {
        console.error('Error en la solicitud: ', response.data);
        alert('Hubo un problema al enviar la solicitud.' + response.data);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Error al enviar la solicitud al servidor.';
      console.error('Error al enviar la solicitud: ', errorMessage);
      alert('Error al enviar la solicitud al servidor. ' + errorMessage);
    } finally {
      cerrarModal();
      setSelectedMateria('');
    }
  };

  return (
    <Box>
      <HeaderStyled>
        <StyledTitle>Solicitar una materia profesor</StyledTitle>
        <GreenButton className="solicitar" onClick={abrirModal}>Solicitar</GreenButton>
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
              {materias.map((materia) => (
                <option key={materia.id} value={materia.nombre}>
                  {materia.nombre}
                </option>
              ))}
            </select>
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <GreenButton className="solicitar" type="submit">
              Enviar solicitud
            </GreenButton>
            <GreenButton className="cancelar" type="button" onClick={cerrarModal}>
              Cancelar
            </GreenButton>
          </div>
        </form>
      </Modal>
    </Box>
  );
};

export default SolicitarMateria;

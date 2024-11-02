// src/components/SolicitarClase.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #4caf50;
    outline: none;
  }
`;

const SolicitarClase = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClase, setSelectedClase] = useState('');
  const [clases, setClases] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState('');
  const [profesores, setProfesores] = useState([]);
  const [selectedHora, setSelectedHora] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const horas = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
  ];

  useEffect(() => {
    // Obtener las clases del backend (que corresponden a las materias)
    const fetchClases = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/materias/todas');
        setClases(response.data);
      } catch (error) {
        console.error('Error al obtener las clases:', error);
      }
    };

    fetchClases();
  }, []);

  useEffect(() => {
    if (selectedClase) {
      // Obtener los profesores para la materia seleccionada
      const fetchProfesores = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/alumnos/por-materia?nombreMateria=${selectedClase}`);
          setProfesores(response.data);
        } catch (error) {
          console.error('Error al obtener los profesores:', error);
        }
      };

      fetchProfesores();
    } else {
      setProfesores([]);
    }
  }, [selectedClase]);

  const abrirModal = () => setIsModalOpen(true);
  const cerrarModal = () => setIsModalOpen(false);

  const handleSolicitud = (event) => {
    event.preventDefault();
    console.log('Clase seleccionada:', {
      clase: selectedClase,
      profesor: selectedProfesor,
      hora: selectedHora,
      fecha: selectedDate,
    });
    enviarSolicitud();
  };

  const enviarSolicitud = async () => {
    const payload = {
      nombreClase: selectedClase.trim(),
    };
    console.log('Payload enviado:', payload);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/solicitud-clase/crear',
        payload
      );

      if (response.status === 200) {
        console.log('Solicitud de clase enviada correctamente');
        alert('Solicitud de clase enviada correctamente');
      } else {
        console.error('Error en la solicitud de clase: ', response.data);
        alert('Hubo un problema al enviar la solicitud de clase.' + response.data);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || 'Error al enviar la solicitud de clase al servidor.';
      console.error('Error al enviar la solicitud de clase: ', errorMessage);
      alert('Error al enviar la solicitud de clase al servidor. ' + errorMessage);
    } finally {
      cerrarModal();
      setSelectedClase('');
      setSelectedProfesor('');
      setSelectedHora('');
      setSelectedDate(null);
    }
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
            Nombre de la clase:
            <select
              required
              value={selectedClase}
              onChange={(e) => setSelectedClase(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="" disabled>
                Seleccione una clase
              </option>
              {clases.map((clase) => (
                <option key={clase.id} value={clase.nombre}>
                  {clase.nombre}
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
              disabled={!profesores.length}
            >
              <option value="" disabled>
                {profesores.length ? 'Seleccione un profesor' : 'Seleccione una clase primero'}
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
              disabled={!selectedProfesor}
            >
              <option value="" disabled>
                {selectedProfesor ? 'Seleccione una hora' : 'Seleccione un profesor primero'}
              </option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: 'block', marginBottom: '15px', textAlign: 'left' }}>
            Fecha:
            <StyledDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="Seleccione una fecha"
              required
            />
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

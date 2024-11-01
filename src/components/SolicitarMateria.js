// src/components/SolicitarMateria.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';


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

  const enviarSolicitud = async () => {
    const userString = localStorage.getItem("user");
    console.log("Contenido de 'user' en local storage:", userString);

    // Realizar doble parseo del string de 'user'
    const parsedUserString = JSON.parse(userString); // Primer parseo
    const user = JSON.parse(parsedUserString.value); // Segundo parseo para obtener el objeto real

    console.log("Objeto user parseado:", user);

    // Acceder a la cédula en localStorage
    const cedulaUsuario = localStorage.getItem("cedula");

    // Verificar si la cédula fue obtenida correctamente
    if (!cedulaUsuario) {
      console.error(
        "No se encontró la cédula del usuario en el objeto user."
      );
      alert("Error al obtener la cédula del ofertante.");
      return;
    }
    // Construye el payload con la cédula y el nombre del rubro
    const payload = {
      cedulaUsuario: cedulaUsuario, // Reemplaza con la cédula correcta si está guardada en el localStorage
      nombreMateria: selectedMateria.trim(), // Asegúrate de que `selectedCategory` tiene el nombre del rubro correcto
    };
    console.log("Payload enviado:", payload);

    try {
      // Envío de la solicitud al backend
      const response = await axios.post(
        "http://localhost:8080/api/solicitud-materia/crear",
        payload
      );

      if (response.status === 200) {
        // Si la solicitud es exitosa, muestra un mensaje de éxito o realiza cualquier otra acción
        console.log("Solicitud enviada correctamente");
        alert("Solicitud enviada correctamente");
      } else {
        console.error("Error en la solicitud: ", response.data);
        alert("Hubo un problema al enviar la solicitud." + response.data);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error al enviar la solicitud al servidor.";
      console.error("Error al enviar la solicitud: ", errorMessage);
      alert("Error al enviar la solicitud al servidor. " + errorMessage);
    } finally {
      // Cerrar el modal y restablecer el estado
      cerrarModal();
      setSelectedMateria("");
    }
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
            <GreenButton type="submit" onClick={enviarSolicitud}>
              Enviar solicitud
              </GreenButton>
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

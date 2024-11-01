import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios from 'axios'; // Importar axios para las solicitudes HTTP

// Estilos visuales
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  animation: ${fadeIn} 1.5s ease-in;
`;

const Alert = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
  animation: ${fadeIn} 0.5s ease-in;

  ${(props) =>
    props.fadeOut &&
    css`
      animation: ${fadeOut} 0.5s ease-out forwards;
    `}
`;

const Boton = styled.button`
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
  margin: 10px;

  &.crear {
    background: #4caf50;
  }
  &.crear:hover {
    background: #388e3c;
    transform: scale(1.05);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.5s ease-in;
`;

const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  padding: 25px;
  width: 350px;
  margin: 15px;
  color: #333;
  transition: transform 0.4s, box-shadow 0.4s, border-bottom 0.4s;
  position: relative;
  overflow: hidden;
  border-bottom: 4px solid transparent;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
    border-bottom: 4px solid #4caf50;
  }
`;

const GestionMaterias = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [materiaNombre, setMateriaNombre] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  const abrirModal = () => {
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  const handleCrearMateria = () => {
    axios
      .post('http://localhost:8080/api/materias/crear', {
        nombre: materiaNombre,
      })
      .then((response) => {
        console.log(response.data);
        setMensajeExito(response.data);
        setMateriaNombre('');
        cerrarModal();

        // Hacer que la alerta desaparezca después de 3 segundos con efecto de desvanecimiento
        setTimeout(() => {
          setFadeOut(true);
        }, 3000);

        // Remover la alerta completamente después de la animación de desvanecimiento
        setTimeout(() => {
          setMensajeExito('');
          setFadeOut(false);
        }, 3500);
      })
      .catch((error) => {
        console.error('Error al crear la materia:', error);
      });
  };

  return (
    <PageContainer>
      {mensajeExito && (
        <Alert fadeOut={fadeOut}>
          {mensajeExito}
        </Alert>
      )}

      <CardContainer onClick={abrirModal}>
        <h1>Gestión de Materias</h1>
        <Boton className="crear">Crear Materia</Boton>
      </CardContainer>

      {modalVisible && (
        <ModalContainer>
          <ModalContent>
            <h2>Crear Materia</h2>
            <input
              type="text"
              value={materiaNombre}
              onChange={(e) => setMateriaNombre(e.target.value)}
              placeholder="Nombre de la materia"
              style={{ width: '90%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Boton className="crear" onClick={handleCrearMateria}>
                Crear
              </Boton>
              <Boton className="crear" onClick={cerrarModal} style={{ background: '#f44336' }}>
                Cancelar
              </Boton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
    </PageContainer>
  );
};

export default GestionMaterias;

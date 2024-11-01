import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  top: 20%;
  transform: translateY(-20%);
  animation: ${fadeIn} 2s ease-in;
`;

const SolicitudCard = styled.div`
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
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
    border-bottom: 4px solid #4caf50;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.4s;
  }
  &:hover::before {
    opacity: 1;
  }
`;

const BotonesAccion = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
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

  &.aceptar {
    background: #4caf50;
  }
  &.aceptar:hover {
    background: #388e3c;
    transform: scale(1.05);
  }

  &.rechazar {
    background: #f44336;
  }
  &.rechazar:hover {
    background: #d32f2f;
    transform: scale(1.05);
  }
`;

const SolicitudesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    // Llamada al backend para obtener las solicitudes pendientes
    axios.get('http://localhost:8080/api/solicitud-materia/pendientes')
      .then(response => {
        setSolicitudes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes pendientes:', error);
      });
  }, []);

  // Funciones para aceptar o rechazar una solicitud
  const aceptarSolicitud = (id) => {
    axios.post(`http://localhost:8080/api/solicitud-materia/aprobar/${id}`)
      .then(response => {
        console.log(`Solicitud con id ${id} aceptada`);
        setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
      })
      .catch(error => {
        console.error(`Error al aceptar la solicitud con id ${id}:`, error);
      });
  };

  const rechazarSolicitud = (id) => {
    console.log(`Solicitud con id ${id} rechazada`);
    // Aquí puedes agregar la lógica para actualizar el estado de la solicitud
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <h2 style={{ color: '#ffffff', marginBottom: '30px', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Solicitudes Pendientes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <SolicitudCard key={solicitud.id}>
                <h3 style={{ marginBottom: '15px', fontSize: '1.8rem' }}>{solicitud.materia.nombre}</h3>
                <p><strong>Estudiante:</strong> {solicitud.alumno.nombre + ' ' + solicitud.alumno.apellido}</p>
                <BotonesAccion>
                  <Boton className="aceptar" onClick={() => aceptarSolicitud(solicitud.id)}>Aceptar</Boton>
                  <Boton className="rechazar" onClick={() => rechazarSolicitud(solicitud.id)}>Rechazar</Boton>
                </BotonesAccion>
              </SolicitudCard>
            ))
          ) : (
            <p style={{ color: '#ffffff', fontSize: '1.5rem' }}>No hay solicitudes pendientes.</p>
          )}
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default SolicitudesPendientes;

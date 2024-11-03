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

const TablaSolicitudes = styled.div`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-top: 30px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  overflow: hidden;
`;

const TablaWrapper = styled.div`
  max-height: 40vh;
  overflow-y: auto;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4caf50;
    border-radius: 10px;
  }
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TablaHeader = styled.thead`
  background: #4caf50;
  color: #ffffff;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TablaRow = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const TablaHeaderCell = styled.th`
  padding: 15px;
`;

const TablaCell = styled.td`
  padding: 15px;
`;

const Boton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
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
    axios.post(`http://localhost:8080/api/solicitud-materia/rechazar/${id}`)
      .then(response => {
        console.log(`Solicitud con id ${id} RECHAZADA`);
        setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
      })
      .catch(error => {
        console.error(`Error al rechazar la solicitud con id ${id}:`, error);
      });
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <h2 style={{ color: '#ffffff', marginBottom: '30px', fontSize: '2.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>Solicitudes Pendientes</h2>
        {solicitudes.length > 0 ? (
          <TablaSolicitudes>
            <TablaWrapper>
              <Tabla>
                <TablaHeader>
                  <TablaRow>
                    <TablaHeaderCell>Materia</TablaHeaderCell>
                    <TablaHeaderCell>Profesor</TablaHeaderCell>
                    <TablaHeaderCell>Acciones</TablaHeaderCell>
                  </TablaRow>
                </TablaHeader>
                <tbody>
                  {solicitudes.map((solicitud) => (
                    <TablaRow key={solicitud.id}>
                      <TablaCell>{solicitud.materia.nombre}</TablaCell>
                      <TablaCell>{solicitud.alumno.nombre + ' ' + solicitud.alumno.apellido}</TablaCell>
                      <TablaCell>
                        <Boton className="aceptar" onClick={() => aceptarSolicitud(solicitud.id)}>Aceptar</Boton>
                        <Boton className="rechazar" onClick={() => rechazarSolicitud(solicitud.id)} style={{ marginLeft: '10px' }}>Rechazar</Boton>
                      </TablaCell>
                    </TablaRow>
                  ))}
                </tbody>
              </Tabla>
            </TablaWrapper>
          </TablaSolicitudes>
        ) : (
          <p style={{ color: '#ffffff', fontSize: '1.5rem' }}>No hay solicitudes pendientes.</p>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default SolicitudesPendientes;

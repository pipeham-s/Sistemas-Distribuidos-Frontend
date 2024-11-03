// src/components/Notificaciones.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NotificacionesContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
`;

const TablaNotificacionesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  box-sizing: border-box;
`;

// Estilo para las tablas de notificaciones
const TablaNotificaciones = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  height: auto;
  overflow: hidden;
  box-sizing: border-box;
`;

const TablaTitulo = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  color: #333;
`;

const TablaContainer = styled.div`
  max-height: 40vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #4caf50 rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4caf50;
    border-radius: 10px;
  }
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const TablaEncabezado = styled.th`
  padding: 8px;
  background-color: #4caf50;
  color: white;
  text-align: left;
`;

const TablaFila = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TablaCelda = styled.td`
  padding: 8px;
  text-align: left;
`;

const FiltroSelect = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 0.9rem;
`;

const Notificaciones = () => {
  const [solicitudesMateria, setSolicitudesMateria] = useState([]);
  const [solicitudesClase, setSolicitudesClase] = useState([]);
  const [filtroMateria, setFiltroMateria] = useState('TODOS');
  const [filtroClase, setFiltroClase] = useState('TODOS');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }, []);

  useEffect(() => {
    const obtenerSolicitudesPendientes = async () => {
      if (!token) {
        console.error('Token no disponible');
        return;
      }

      try {
        let decodedToken;
        try {
          decodedToken = JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          console.error('Error al decodificar el token:', e);
          return;
        }

        const cedula = decodedToken?.cedula;
        if (!cedula) {
          console.error('Cédula no encontrada en el token');
          return;
        }

        try {
          const responseMateria = await axios.get(
            `http://localhost:8080/api/solicitud-materia/pendientes/${cedula}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSolicitudesMateria(responseMateria.data);
        } catch (error) {
          console.error('Error al obtener solicitudes de materia:', error);
        }

        try {
          const responseClase = await axios.get(
            `http://localhost:8080/api/solicitud-clase/pendientes/${cedula}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSolicitudesClase(responseClase.data);
        } catch (error) {
          console.error('Error al obtener solicitudes de clase:', error);
        }
      } catch (error) {
        console.error('Error general al obtener solicitudes:', error);
      }
    };

    if (token) {
      obtenerSolicitudesPendientes();
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        obtenerSolicitudesPendientes();
      }
    }, 5000); // Actualiza cada 5 segundos

    return () => clearInterval(interval);
  }, [token]);

  const obtenerSolicitudesPendientes = async () => {
    if (!token) {
      console.error('Token no disponible');
      return;
    }

    try {
      let decodedToken;
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        return;
      }

      const cedula = decodedToken?.cedula;
      if (!cedula) {
        console.error('Cédula no encontrada en el token');
        return;
      }

      try {
        const responseMateria = await axios.get(
          `http://localhost:8080/api/solicitud-materia/pendientes/${cedula}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSolicitudesMateria(responseMateria.data);
      } catch (error) {
        console.error('Error al obtener solicitudes de materia:', error);
      }

      try {
        const responseClase = await axios.get(
          `http://localhost:8080/api/solicitud-clase/pendientes${cedula}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSolicitudesClase(responseClase.data);
      } catch (error) {
        console.error('Error al obtener solicitudes de clase:', error);
      }
    } catch (error) {
      console.error('Error general al obtener solicitudes:', error);
    }
  };

  const filtrarSolicitudes = (solicitudes, filtro) => {
    if (filtro === 'TODOS') return solicitudes;
    return solicitudes.filter((solicitud) => solicitud.estado === filtro);
  };

  return (
    <NotificacionesContainer>
      {/* Sección para las solicitudes de materia */}
      <TablaNotificacionesWrapper>
        <TablaNotificaciones>
          <TablaTitulo>Mis Solicitudes de Materia</TablaTitulo>
          <FiltroSelect value={filtroMateria} onChange={(e) => setFiltroMateria(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="RECHAZADA">Rechazada</option>
            <option value="APROBADA">Aprobada</option>
          </FiltroSelect>
          <TablaContainer>
            <Tabla>
              <thead>
                <tr>
                  <TablaEncabezado>Materia</TablaEncabezado>
                  <TablaEncabezado>Estado</TablaEncabezado>
                </tr>
              </thead>
              <tbody>
                {filtrarSolicitudes(solicitudesMateria, filtroMateria).length > 0 ? (
                  filtrarSolicitudes(solicitudesMateria, filtroMateria).map((solicitud) => (
                    <TablaFila key={solicitud.id}>
                      <TablaCelda>{solicitud.materia?.nombre || 'No disponible'}</TablaCelda>
                      <TablaCelda>{solicitud.estado || 'No disponible'}</TablaCelda>
                    </TablaFila>
                  ))
                ) : (
                  <tr>
                    <TablaCelda colSpan="2">No tienes solicitudes pendientes.</TablaCelda>
                  </tr>
                )}
              </tbody>
            </Tabla>
          </TablaContainer>
        </TablaNotificaciones>
      </TablaNotificacionesWrapper>

      {/* Sección para las solicitudes de clase */}
      <TablaNotificacionesWrapper>
        <TablaNotificaciones>
          <TablaTitulo>Mis Solicitudes de Clase</TablaTitulo>
          <FiltroSelect value={filtroClase} onChange={(e) => setFiltroClase(e.target.value)}>
            <option value="TODOS">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="RECHAZADA">Rechazada</option>
            <option value="ACEPTADA">Aceptada</option>
          </FiltroSelect>
          <TablaContainer>
            <Tabla>
              <thead>
                <tr>
                  <TablaEncabezado>Materia</TablaEncabezado>
                  <TablaEncabezado>Profesor</TablaEncabezado>
                  <TablaEncabezado>Fecha de Solicitud</TablaEncabezado>
                  <TablaEncabezado>Estado</TablaEncabezado>
                </tr>
              </thead>
              <tbody>
                {filtrarSolicitudes(solicitudesClase, filtroClase).length > 0 ? (
                  filtrarSolicitudes(solicitudesClase, filtroClase).map((solicitud) => (
                    <TablaFila key={solicitud.id}>
                      <TablaCelda>{solicitud.materia?.nombre || 'No disponible'}</TablaCelda>
                      <TablaCelda>{`${solicitud.profesor?.nombre} ${solicitud.profesor?.apellido}` || 'No disponible'}</TablaCelda>
                      <TablaCelda>{new Date(solicitud.fechaSolicitud).toLocaleString() || 'No disponible'}</TablaCelda>
                      <TablaCelda>{solicitud.estado || 'No disponible'}</TablaCelda>
                    </TablaFila>
                  ))
                ) : (
                  <tr>
                    <TablaCelda colSpan="4">No tienes solicitudes de clase pendientes.</TablaCelda>
                  </tr>
                )}
              </tbody>
            </Tabla>
          </TablaContainer>
        </TablaNotificaciones>
      </TablaNotificacionesWrapper>
    </NotificacionesContainer>
  );
};

export default Notificaciones;
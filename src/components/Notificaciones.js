import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NotificacionesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
`;

const TablaNotificacionesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-sizing: border-box;
`;

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
  const [clasesAlumno, setClasesAlumno] = useState([]);
  const [clasesProfesor, setClasesProfesor] = useState([]);
  const [filtroMateria, setFiltroMateria] = useState('TODOS');
  const [filtroClase, setFiltroClase] = useState('PENDIENTE');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      obtenerSolicitudesPendientes(savedToken);
      obtenerClases(savedToken);
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }, []);

  const obtenerSolicitudesPendientes = async (token) => {
    if (!token) {
      console.error('Token no disponible');
      return;
    }

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
        `http://localhost:8080/api/solicitud-materia/pendientes`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const todasSolicitudes = responseMateria.data;
      const solicitudesUsuario = todasSolicitudes.filter((solicitud) => solicitud.alumno.cedula === cedula);
      setSolicitudesMateria(solicitudesUsuario);
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
  };

  const obtenerClases = async (token) => {
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
      const responseAlumno = await axios.get(
        `http://localhost:8080/api/clases/clasesAlumno/${cedula}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const clasesAlumnoData = responseAlumno.data.filter((clase) => new Date(clase.fecha) > new Date());
      setClasesAlumno(clasesAlumnoData);
    } catch (error) {
      console.error('Error al obtener clases del alumno:', error);
    }

    try {
      const responseProfesor = await axios.get(
        `http://localhost:8080/api/clases/clasesProfesor/${cedula}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const clasesProfesorData = responseProfesor.data.filter((clase) => new Date(clase.fecha) > new Date());
      setClasesProfesor(clasesProfesorData);
    } catch (error) {
      console.error('Error al obtener clases del profesor:', error);
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
          <TablaTitulo>Mis Solicitudes de Materia Pendientes</TablaTitulo>
          
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
          <TablaTitulo>Mis Solicitudes de Clase como Alumno</TablaTitulo>
          <FiltroSelect value={filtroClase} onChange={(e) => setFiltroClase(e.target.value)}>
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
                  <TablaEncabezado>Profesor</TablaEncabezado>
                  <TablaEncabezado>Fecha de la clase</TablaEncabezado>
                  <TablaEncabezado>Estado</TablaEncabezado>
                </tr>
              </thead>
              <tbody>
                {filtrarSolicitudes(solicitudesClase, filtroClase)
                  .filter((solicitud) => {
                    const fechaSolicitud = new Date(solicitud.fechaSolicitud);
                    const hoy = new Date();
                    // Comparar solo la parte de la fecha, ignorando la hora
                    return fechaSolicitud.setHours(0, 0, 0, 0) >= hoy.setHours(0, 0, 0, 0);
                  })
                  .length > 0 ? (
                  filtrarSolicitudes(solicitudesClase, filtroClase)
                    .filter((solicitud) => {
                      const fechaSolicitud = new Date(solicitud.fechaSolicitud);
                      const hoy = new Date();
                      // Comparar solo la parte de la fecha, ignorando la hora
                      return fechaSolicitud.setHours(0, 0, 0, 0) >= hoy.setHours(0, 0, 0, 0);
                    })
                    .map((solicitud) => (
                      <TablaFila key={solicitud.id}>
                        <TablaCelda>{solicitud.materia?.nombre || 'No disponible'}</TablaCelda>
                        <TablaCelda>{`${solicitud.profesor?.nombre} ${solicitud.profesor?.apellido}` || 'No disponible'}</TablaCelda>
                        <TablaCelda>{new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }) || 'No disponible'}</TablaCelda>
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

      {/* Sección para las clases futuras como alumno */}
      <TablaNotificacionesWrapper>
        <TablaNotificaciones>
          <TablaTitulo>Mis Clases Futuras como Alumno</TablaTitulo>
          <TablaContainer>
            <Tabla>
              <thead>
                <tr>
                  <TablaEncabezado>Materia</TablaEncabezado>
                  <TablaEncabezado>Profesor</TablaEncabezado>
                  <TablaEncabezado>Fecha de la clase</TablaEncabezado>
                </tr>
              </thead>
              <tbody>
                {clasesAlumno.length > 0 ? (
                  clasesAlumno.map((clase) => (
                    <TablaFila key={clase.id}>
                      <TablaCelda>{clase.materia?.nombre || 'No disponible'}</TablaCelda>
                      <TablaCelda>{`${clase.profesor?.nombre} ${clase.profesor?.apellido}` || 'No disponible'}</TablaCelda>
                      <TablaCelda>{new Date(clase.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }) || 'No disponible'}</TablaCelda>
                    </TablaFila>
                  ))
                ) : (
                  <tr>
                    <TablaCelda colSpan="3">No tienes clases futuras como alumno.</TablaCelda>
                  </tr>
                )}
              </tbody>
            </Tabla>
          </TablaContainer>
        </TablaNotificaciones>
      </TablaNotificacionesWrapper>

      {/* Sección para las clases futuras como profesor */}
      <TablaNotificacionesWrapper>
        <TablaNotificaciones>
          <TablaTitulo>Mis Clases Futuras como Profesor</TablaTitulo>
          <TablaContainer>
            <Tabla>
              <thead>
                <tr>
                  <TablaEncabezado>Materia</TablaEncabezado>
                  <TablaEncabezado>Alumno</TablaEncabezado>
                  <TablaEncabezado>Fecha de la clase</TablaEncabezado>
                </tr>
              </thead>
              <tbody>
                {clasesProfesor.length > 0 ? (
                  clasesProfesor.map((clase) => (
                    <TablaFila key={clase.id}>
                      <TablaCelda>{clase.materia?.nombre || 'No disponible'}</TablaCelda>
                      <TablaCelda>{`${clase.alumno?.nombre} ${clase.alumno?.apellido}` || 'No disponible'}</TablaCelda>
                      <TablaCelda>{new Date(clase.fecha).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }) || 'No disponible'}</TablaCelda>
                    </TablaFila>
                  ))
                ) : (
                  <tr>
                    <TablaCelda colSpan="3">No tienes clases futuras como profesor.</TablaCelda>
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

// src/pages/MisClasesPage.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Permite la interacción con eventos
import backgroundImage from '../images/universidad.jpg';
import './calendarStyles.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;  /* Aumentar el ancho para el calendario */
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const CalendarContainer = styled.div`
  background-color: white;  /* Fondo blanco */
  border: 3px solid green;  /* Borde verde más grueso */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;  /* Ajustar el tamaño del calendario */
  margin-top: 20px;
`;

const StyledEvent = styled.div`
  background-color: #2e7d32;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MisClasesPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      let decodedToken;
      try {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        console.error('Error al decodificar el token:', e);
        return;
      }

      const cedula = decodedToken.cedula; // Asumiendo que la cédula está presente en el token decodificado
      console.log('Cédula decodificada:', cedula);

      if (!cedula) {
        console.error('Cédula no encontrada en el token');
        return;
      }

      // Llamar al backend para obtener las clases del alumno
      axios.get(`http://localhost:8080/api/clases/clasesAlumno/${cedula}`)
        .then(responseAlumno => {
          const clasesAlumno = responseAlumno.data;
          console.log('Clases obtenidas del alumno:', clasesAlumno);
          // Llamar al backend para obtener las clases del profesor
          axios.get(`http://localhost:8080/api/clases/clasesProfesor/${cedula}`)
            .then(responseProfesor => {
              const clasesProfesor = responseProfesor.data;
              console.log('Clases obtenidas del profesor:', clasesProfesor);
              // Combinar las clases de alumno y profesor
              const todasClases = [...clasesAlumno, ...clasesProfesor];
              // Mapear las clases al formato requerido por FullCalendar
              const eventos = todasClases.map(clase => ({
                title: clase.materia.nombre,
                date: clase.fecha,
                extendedProps: clase.profesor ? {
                  profesorNombre: `${clase.profesor.nombre} ${clase.profesor.apellido}`,
                  profesorCorreo: clase.profesor.correo,
                } : {
                  alumnoNombre: `${clase.alumno.nombre} ${clase.alumno.apellido}`,
                  alumnoCorreo: clase.alumno.correo,
                },
                display: 'block',
                render: 'background'
              }));
              setEvents(eventos);
            })
            .catch(error => {
              console.error('Error al obtener las clases del profesor:', error);
            });
        })
        .catch(error => {
          console.error('Error al obtener las clases del alumno:', error);
        });
    }
  }, []);

  const handleEventClick = (clickInfo) => {
    const { title, extendedProps } = clickInfo.event;
    const detailsHtml = extendedProps.profesorNombre ?
      `
        <p style="color: #2e7d32;"><b>Profesor:</b> ${extendedProps.profesorNombre}</p>
        <p style="color: #2e7d32;"><b>Correo del Profesor:</b> ${extendedProps.profesorCorreo}</p>
      ` :
      `
        <p style="color: #2e7d32;"><b>Alumno:</b> ${extendedProps.alumnoNombre}</p>
        <p style="color: #2e7d32;"><b>Correo del Alumno:</b> ${extendedProps.alumnoCorreo}</p>
      `;

    Swal.fire({
      title: `<strong>Detalles de la Clase: ${title}</strong>`,
      html: detailsHtml,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#2e7d32',
      backdrop: false, // Desactiva el deszoom de la pantalla
    });
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            selectable={false} // Deshabilitar la selección de celdas
            editable={false} // No permitir editar eventos existentes
            eventClick={handleEventClick} // Mostrar detalles de la clase al hacer clic en un evento
            eventContent={(eventInfo) => (
              <StyledEvent>
                {eventInfo.event.title}
              </StyledEvent>
            )}
          />
        </CalendarContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MisClasesPage;

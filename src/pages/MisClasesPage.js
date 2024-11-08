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
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: auto; // Para ajustar el eje vertical
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1000px;  /* Aumentar el ancho para el calendario */
  padding: 20px;
  box-sizing: border-box;
  margin-top: 100px; /* Ajustar la separación desde el header para evitar superposición */
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

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  width: 90%;
  max-width: 1000px;
  position: relative;
  z-index: 50; /* Asegurar que la leyenda esté por debajo del header pero visible */
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => props.color};
`;

const LegendText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const StyledEventAlumno = styled.div`
  background-color: #2e7d32;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledEventProfesor = styled.div`
  background-color: #1e88e5;
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MisClasesPage = () => {
  const [eventsAlumno, setEventsAlumno] = useState([]);
  const [eventsProfesor, setEventsProfesor] = useState([]);

  useEffect(() => {
    //que la pantalla se abra en la parte superior
    window.scrollTo(0, 0);
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
          const eventosAlumno = clasesAlumno.map(clase => ({
            title: clase.materia.nombre,
            date: clase.fecha,
            allDay: true, // Para que ocupe todo el ancho del día
            extendedProps: {
              profesorNombre: `${clase.profesor.nombre} ${clase.profesor.apellido}`,
              profesorCorreo: clase.profesor.correo,
            },
            backgroundColor: '#2e7d32', // Color para eventos del alumno
          }));
          setEventsAlumno(eventosAlumno);
        })
        .catch(error => {
          console.error('Error al obtener las clases del alumno:', error);
        });

      // Llamar al backend para obtener las clases del profesor
      axios.get(`http://localhost:8080/api/clases/clasesProfesor/${cedula}`)
        .then(responseProfesor => {
          const clasesProfesor = responseProfesor.data;
          console.log('Clases obtenidas del profesor:', clasesProfesor);
          const eventosProfesor = clasesProfesor.map(clase => ({
            title: clase.materia.nombre,
            date: clase.fecha,
            allDay: true, // Para que ocupe todo el ancho del día
            extendedProps: {
              alumnoNombre: `${clase.alumno.nombre} ${clase.alumno.apellido}`,
              alumnoCorreo: clase.alumno.correo,
            },
            backgroundColor: '#1e88e5', // Color para eventos del profesor
          }));
          setEventsProfesor(eventosProfesor);
        })
        .catch(error => {
          console.error('Error al obtener las clases del profesor:', error);
        });
    }
  }, []);

  const handleEventClick = (clickInfo) => {
    const { title, extendedProps } = clickInfo.event;
    const detailsHtml = extendedProps.alumnoNombre ?
      `
        <p style="color: #2e7d32;"><b>Alumno:</b> ${extendedProps.alumnoNombre}</p>
        <p style="color: #2e7d32;"><b>Correo del Alumno:</b> ${extendedProps.alumnoCorreo}</p>
      ` :
      `
        <p style="color: #1e88e5;"><b>Profesor:</b> ${extendedProps.profesorNombre}</p>
        <p style="color: #1e88e5;"><b>Correo del Profesor:</b> ${extendedProps.profesorCorreo}</p>
      `;

    Swal.fire({
      title: `<strong>Detalles de la Clase: ${title}</strong>

      <span style="color: red;">¡Comunicáte con el ${extendedProps.alumnoNombre == null ? 'profesor' : 'alumno'}!</span>`,
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
        <LegendContainer>
          <LegendItem>
            <ColorBox color="#1e88e5" />
            <LegendText>Clases donde soy alumno</LegendText>
          </LegendItem>
          <LegendItem>
            <ColorBox color="#2e7d32" />
            <LegendText>Clases donde soy profesor</LegendText>
          </LegendItem>
        </LegendContainer>
        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[...eventsAlumno, ...eventsProfesor]}
            selectable={false} // Deshabilitar la selección de celdas
            editable={false} // No permitir editar eventos existentes
            eventClick={handleEventClick} // Mostrar detalles de la clase al hacer clic en un evento
            eventContent={(eventInfo) => (
              eventInfo.event.extendedProps.profesorNombre ?
                <StyledEventProfesor>{eventInfo.event.title}</StyledEventProfesor> :
                <StyledEventAlumno>{eventInfo.event.title}</StyledEventAlumno>
            )}
          />
        </CalendarContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MisClasesPage;

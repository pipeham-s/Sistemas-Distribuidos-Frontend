// src/pages/MisClasesPage.js

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Permite la interacción con eventos
import backgroundImage from '../images/universidad.jpg';

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
  background-color: rgba(130, 201, 177, 0.9);  /* Fondo verde menos transparente */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;  /* Ajustar el tamaño del calendario */
  margin-top: 20px;
`;

const MisClasesPage = () => {
  const [events, setEvents] = useState([
    { title: 'Clase de Matemática', date: '2024-10-01' },
    { title: 'Clase de Física', date: '2024-10-07' },
  ]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Ingrese el título para el evento:');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // Deselecciona el área después de crear un evento

    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        },
      ]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`¿Deseas eliminar el evento '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <CalendarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateSelect}
            events={events}
            eventClick={handleEventClick}
          />
        </CalendarContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

export default MisClasesPage;

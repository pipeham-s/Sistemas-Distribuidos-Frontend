import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo verde.png'; // Asegúrate de que la ruta del logo sea correcta

// Definir el contenedor principal del Header
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alineación de los elementos a la izquierda */
  background-color: #82c9b1; /* Color de fondo */
  padding: 0; /* Elimina cualquier padding adicional */
  margin: 0; /* Elimina cualquier margen adicional */
  height: 80px; /* Ajusta la altura del header */
  width: 100%; /* Asegúrate de que ocupe todo el ancho */
  position: fixed; /* Fija el header en la parte superior */
  top: 0; /* Asegura que el header esté alineado con la parte superior */
  left: 0; /* Alinea el header con el borde izquierdo */
  z-index: 100; /* Asegura que el header esté por encima del contenido */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem; /* Espacio entre el borde y el logo */
`;

const Logo = styled.img`
  height: 50px; /* Ajusta la altura del logo */
  width: auto;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: white;
  font-weight: bold;
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logo} alt="Logo" /> {/* Asegúrate de que solo haya un logo aquí */}
              </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;

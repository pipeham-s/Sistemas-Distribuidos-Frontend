import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Box = styled.div`
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
  animation: ${fadeIn} 1.5s ease-in;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
    border-bottom: 4px solid #4caf50;
  }
`;

const StyledTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: center;
`;

const GreenButton = styled.button`
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

  background: #4caf50;
  &:hover {
    background: #388e3c;
    transform: scale(1.05);
  }
`;

const MisClases = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/mis-clases');
  };

  return (
    <Box>
      <StyledTitle>Calendario</StyledTitle>
      <GreenButton onClick={handleNavigate} style={{ alignSelf: 'center' }}>Ver Mis Clases</GreenButton>
    </Box>
  );
};

export default MisClases;

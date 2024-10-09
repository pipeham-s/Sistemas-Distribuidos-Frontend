// src/components/RegisterForm.js

import React, { useState } from 'react';
import styled from 'styled-components';

// Contenedor principal del formulario con color verde agua y opacidad al 95%
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(130, 201, 177, 0.80);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #381d2a; /* Color de texto */
`;

// Estilos para los inputs de texto
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6C3B2A; /* Color del botón */
  color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #492536; /* Color al hacer hover */
  }
`;

const Link = styled.a`
  color: #6C3B2A;
  margin-top: 15px;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    contrasena: '',
    repetirContrasena: '',
    tipoUsuario: '',
    aceptaTerminos: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  return (
    <FormContainer>
      <Title>Regístrate</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="cedula"
          placeholder="Cédula de identidad"
          value={formData.cedula}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formData.correo}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={formData.contrasena}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="repetirContrasena"
          placeholder="Repite la contraseña"
          value={formData.repetirContrasena}
          onChange={handleChange}
          required
        />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            required
          />
          <Label>
            Acepto los <Link href="#">términos y condiciones</Link>
          </Label>
        </CheckboxContainer>
        <Button type="submit">Registrarse</Button>
      </form>
      <Link href="#">Ya tengo una cuenta</Link>
    </FormContainer>
  );
};

export default RegisterForm;

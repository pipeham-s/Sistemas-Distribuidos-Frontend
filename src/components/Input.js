import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

function Input({ placeholder, type, className, value, onChange, width, minWidth, height, minHeight, multiple }) {

  const widthClass = {
    fill: "w-full",
    fixed: "w-auto",
    hug: "inline-block"
  };

  const heightClass = {
    fill: "h-full",
    fixed: "h-auto",
    hug: "inline-block"
  };

  return (
    <input
      className={`rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${widthClass[width]} ${heightClass[height]} ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ minWidth: minWidth, minHeight: minHeight }}
      multiple={multiple}  // Añadir esta línea para soportar múltiples archivos
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  width: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minWidth: PropTypes.string,
  height: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minHeight: PropTypes.string,
  multiple: PropTypes.bool  // Añadir esta línea para la propiedad múltiple
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
  className: '',
  value: '',
  onChange: null,
  width: 'fixed',
  minWidth: '0',
  height: 'fixed',
  minHeight: '0',
  multiple: false  // Añadir esta línea para la propiedad múltiple
};

export default Input;
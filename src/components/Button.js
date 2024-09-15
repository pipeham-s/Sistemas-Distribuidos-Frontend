import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, className, type, width, minWidth, height, minHeight }) {
  const baseStyle = "px-4 py-2 rounded-md focus:outline-none focus:ring-2";
  const typeClass = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
    outline: "bg-white text-gray-700 border border-gray-500 hover:bg-gray-100 focus:ring-gray-300",
    glass: "bg-transparent text-white border-2 border-white rounded-full backdrop-blur-md hover:bg-white hover:bg-opacity-10 hover:border-white hover:text-white",
    darkBlue: "bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700",
    green: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300",
    red: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300"
  };

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
    <button
      onClick={onClick}
      className={`${baseStyle} ${typeClass[type]} ${widthClass[width]} ${heightClass[height]} ${className}`}
      style={{ minWidth: minWidth, minHeight: minHeight }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  width: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minWidth: PropTypes.string,
  height: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minHeight: PropTypes.string,
};

Button.defaultProps = {
  onClick: null,
  className: '',
  type: 'primary',
  width: 'fixed',
  minWidth: '0',
  height: 'fixed',
  minHeight: '0',
};

export default Button;
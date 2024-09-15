import React from 'react';
import PropTypes from 'prop-types';

function ButtonMenu({ children, onClick, className, type, width, minWidth, height, minHeight }) {
  const baseStyle = "px-4 py-2 focus:outline-none w-full";
  const typeClass = {
    menu: "bg-white text-black border-b border-black hover:bg-gray-300 focus:bg-gray-300" // Estilo para botones del menú
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

ButtonMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'menu']),
  width: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minWidth: PropTypes.string,
  height: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minHeight: PropTypes.string,
};

ButtonMenu.defaultProps = {
  onClick: null,
  className: '',
  type: 'menu',
  width: 'fixed',
  minWidth: '0',
  height: 'fixed',
  minHeight: '0',
};

export default ButtonMenu;
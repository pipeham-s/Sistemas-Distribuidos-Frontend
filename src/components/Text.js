import React from 'react';
import PropTypes from 'prop-types';

function Text({ size, children, className, width, minWidth, height, minHeight }) {
  const baseStyle = "text-gray-900";
  const sizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
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
    <p
      className={`${baseStyle} ${sizeClass[size]} ${widthClass[width]} ${heightClass[height]} ${className}`}
      style={{ minWidth: minWidth, minHeight: minHeight }}
    >
      {children}
    </p>
  );
}

Text.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minWidth: PropTypes.string,
  height: PropTypes.oneOf(['fill', 'fixed', 'hug']),
  minHeight: PropTypes.string,
};

Text.defaultProps = {
  size: 'base',
  className: '',
  width: 'fixed',
  minWidth: '0',
  height: 'fixed',
  minHeight: '0',
};

export default Text;
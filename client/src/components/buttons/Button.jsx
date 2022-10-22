import React from 'react';

const Button = ({
  onClick,
  className = '',
  full = false,
  type = 'button',
  bgColor = 'bg-black',
  children,
  ...props
}) => {

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      className={`py-3 px-6 capitalize rounded-md mt-auto ${
        full ? 'w-full' : ''
      } ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

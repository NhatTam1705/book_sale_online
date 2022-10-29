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
      className={`py-3 px-6 capitalize rounded-md ${
        full ? 'w-full' : ''
      } ${bgColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

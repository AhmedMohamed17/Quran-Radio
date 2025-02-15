const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

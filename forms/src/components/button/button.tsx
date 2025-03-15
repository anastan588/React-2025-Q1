type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isFilled?: boolean;
};

function Button({
  className,
  onClick,
  children,
  type = 'button',
  isFilled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`hover:bg-hover-form-button hover:text-text-hover rounded-lg border-2 border-white px-3 py-2 ${className} ${isFilled ? 'bg-dark-green text-text-primary' : 'text-text-form-button bg-white'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

import { ButtonProps } from '$/types/types';

export function Button({
  className,
  onClick,
  children,
  type = 'button',
  isFilled,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`hover:bg-hover-form-button hover:text-text-hover rounded-lg border-2 border-white px-3 py-2 disabled:pointer-events-none disabled:text-white ${className} ${isFilled ? 'bg-dark-green text-text-primary' : 'text-text-form-button bg-white'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

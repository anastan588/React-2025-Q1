export type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isFilled?: boolean;
  disabled?: boolean;
};

export interface HeaderProps {
  title_text: string;
}

export type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isFilled?: boolean;
  disabled?: boolean;
};

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean | undefined;
  picture: string;
  country: string[];
  countrySelect: string;
  isFormContFilled?: boolean;
  isFormUncontFilled?: boolean;
}

export interface HeaderProps {
  title_text: string;
}

export interface FormInfoProps {
  formInfo: ControlledFormState | FormState;
  info_title: string;
}

export interface CheckboxInputProps {
  label: string;
  name: keyof FormState;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface FileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  picture?: string;
  error?: string;
}

export interface RadioInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface SelectInputProps {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface TextInputProps {
  label: string;
  name: keyof FormState;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface ControlledFormState {
  terms?: boolean;
  gender: 'male' | 'female';
  country: (string | undefined)[];
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  picture: string;
  countrySelect: string;
  isFormContFilled: boolean;
  isFormUncontFilled?: boolean;
}

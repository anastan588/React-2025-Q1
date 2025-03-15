import React from 'react';

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function CheckboxInput(props: CheckboxInputProps) {
  const { label, name, checked, onChange, error } = props;

  return (
    <div className="flex gap-2 tracking-widest">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
      {error && (
        <div className="text-text-closeButton col-span-2 w-full">{error}</div>
      )}
    </div>
  );
}

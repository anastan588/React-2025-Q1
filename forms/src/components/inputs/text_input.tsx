import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function TextInput(props: TextInputProps) {
  const { label, name, type = 'text', value, onChange, error } = props;

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2 tracking-widest">
      <label className="font-bold" htmlFor={name}>
        {label}:
      </label>
      <input
        className="bg-dark-grey text-text-primary p-1"
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="text-text-closeButton col-span-2 w-full">{error}</div>
      )}
    </div>
  );
}

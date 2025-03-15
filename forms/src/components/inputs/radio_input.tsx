import React from 'react';

interface RadioInputProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function RadioInput(props: RadioInputProps) {
  const { label, name, options, selectedValue, onChange, error } = props;

  return (
    <fieldset className="grid grid-cols-[1fr_2fr] gap-2 tracking-widest">
      <legend>{label}:</legend>
      <div className="flex gap-2">
        {options.map((option) => (
          <div className="flex gap-2" key={option.value}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      {error && (
        <div className="text-text-closeButton col-span-2 w-full">{error}</div>
      )}
    </fieldset>
  );
}

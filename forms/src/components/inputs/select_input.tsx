import React, { useState } from 'react';

interface SelectInputProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function SelectInput(props: SelectInputProps) {
  const { label, name, options, value, onChange, error } = props;

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onChange(event);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  return (
    <div className="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2 tracking-widest">
      <label htmlFor={name}>{label}:</label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
        className="w-full rounded-lg border p-2"
        list={`${name}-options`}
      />
      <datalist id={`${name}-options`}>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
      {error && (
        <div className="text-text-closeButton col-span-2 w-full">{error}</div>
      )}
    </div>
  );
}

import React, { forwardRef, useRef, useState } from 'react';

import { SelectInputProps } from '$/types';

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (props, ref) => {
    const { label, name, options, value, onChange, error, ...rest } = props;

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
    const inputRef = useRef<HTMLInputElement | null>(null);
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
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          {...rest}
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
);

SelectInput.displayName = 'SelectInput';

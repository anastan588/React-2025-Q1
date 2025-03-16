import React, { forwardRef, useRef } from 'react';

import { TextInputProps } from '$/types';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const {
      label,
      name,
      type = 'text',
      value,
      onChange,
      error,
      ...rest
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="grid grid-cols-[1fr_2fr] grid-rows-2 gap-2 tracking-widest">
        <label className="font-bold" htmlFor={name}>
          {label}:
        </label>
        <input
          {...rest}
          className="bg-dark-grey text-text-primary p-1"
          type={type}
          name={name}
          required
          value={value === '0' ? '' : value}
          onChange={onChange}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
        />
        {error && (
          <div className="text-text-closeButton col-span-2 w-full">{error}</div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

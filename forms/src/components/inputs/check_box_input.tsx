import { forwardRef, useRef } from 'react';

import { CheckboxInputProps } from '$/types';

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (props, ref) => {
    const { label, name, checked, onChange, error, ...rest } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="flex gap-2 tracking-widest">
        <input
          {...rest}
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
        />
        <label htmlFor={name}>{label}</label>
        {error && (
          <div className="text-text-closeButton col-span-2 w-full">{error}</div>
        )}
      </div>
    );
  }
);

CheckboxInput.displayName = 'CheckboxInput';

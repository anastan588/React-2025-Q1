import { forwardRef, useRef } from 'react';

import { FileInputProps } from '$/types';

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (props, ref) => {
    const { label, onChange, picture, error } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
      <div className="grid grid-cols-3 grid-rows-[1fr_fr] gap-2 tracking-widest">
        <label>{label}:</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={onChange}
          ref={(el) => {
            inputRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          className="focus:ring-dark-blue rounded-lg border-1 p-1 transition duration-200 focus:ring-2 focus:outline-none"
        />
        {picture && <img src={picture} alt="Uploaded" className="max-h-8" />}
        {error && (
          <div className="text-text-closeButton col-span-2 w-full">{error}</div>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

import React from 'react';

interface FileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  picture?: string;
  error?: string;
}

export function FileInput(props: FileInputProps) {
  const { label, onChange, picture, error } = props;

  return (
    <div className="grid grid-cols-3 grid-rows-[1fr_fr] gap-2 tracking-widest">
      <label>{label}:</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onChange}
        className="rounded-lg border-1 p-1 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {picture && <img src={picture} alt="Uploaded" className="max-h-8" />}
      {error && (
        <div className="text-text-closeButton col-span-2 w-full">{error}</div>
      )}
    </div>
  );
}

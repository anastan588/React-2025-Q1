// components/Modal.tsx
import React from 'react';
import { ErrorProps } from '../types/types';

export class ErrorModal extends React.Component<ErrorProps> {
  render() {
    const { error, onClose } = this.props;
    return (
      <div className="flex flex-col gap-2.5 p-12 w-full bg-rose-400 rounded-lg text-center ">
        <p className="text-white text-[130%]">{error.message}</p>
        <button
          className="border-2 border-white rounded-lg p-2.5 text-white text-[120%]  hover:bg-white hover:text-rose-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }
}

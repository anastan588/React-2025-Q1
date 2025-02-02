// components/Modal.tsx
import React from 'react';
import { ErrorProps } from '../types/types';

export class ErrorModal extends React.Component<ErrorProps> {
  render() {
    console.log(this.props);
    const { error, onClose } = this.props;
    return (
      <div className="error_overlay">
        <div className="error">
          <p className="error_title">{error.message}</p>
          <button className="error_button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

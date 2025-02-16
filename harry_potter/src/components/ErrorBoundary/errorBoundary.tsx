import React, { ErrorInfo } from 'react';

import { Snow } from '$/assets/assetsExport';
import { ErrorBoundaryState } from '$/types';

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }
  logErrorToMyService(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error.message);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logErrorToMyService(error, errorInfo);
  }

  handleResetError = () => {
    console.log('kgjfgfkgjfkg');
    console.log(this.props.children);
    this.setState({ hasError: false });
    console.log(this.state);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="bg-dark-blue flex h-screen flex-col items-center gap-5 p-10"
          style={{
            backgroundImage: `url(${Snow})`,
          }}
        >
          <h1 className="text-dark-yellow text-[130%]">Something went wrong</h1>
          <button
            className="text-light-red rounded-lg border-2 border-white px-6 py-2.5 text-[130%]"
            type="button"
            onClick={this.handleResetError}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

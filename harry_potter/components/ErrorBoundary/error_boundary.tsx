import React, { ErrorInfo } from 'react';

import { ErrorBoundaryState, ThemeContext } from '$/components';
import { Images } from '$/public';

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
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ThemeContext.Consumer>
          {({ theme }) => (
            <div
              data-theme={theme}
              className="bg-secondary flex h-screen flex-col items-center gap-5 p-10"
              style={{
                backgroundImage: `url(${Images.Snow})`,
              }}
            >
              <h1 className="text-text-secondary text-[130%]">
                Something went wrong
              </h1>
              <button
                className="text-text-errorBoundary rounded-lg border-2 border-white px-6 py-2.5 text-[130%]"
                type="button"
                onClick={this.handleResetError}
              >
                Try again
              </button>
            </div>
          )}
        </ThemeContext.Consumer>
      );
    }
    return this.props.children;
  }
}

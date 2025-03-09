import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { ErrorBoundary } from '$/components';

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('renders message about error', async () => {
    const TestComponentWithError = () => {
      throw new Error('123');
    };
    render(
      <ErrorBoundary>
        <TestComponentWithError />
      </ErrorBoundary>
    );
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
  test("renders button 'Try again'", async () => {
    const TestComponentWithError = () => {
      throw new Error('Error test');
    };
    render(
      <ErrorBoundary>
        <TestComponentWithError />
      </ErrorBoundary>
    );
    await waitFor(() => {
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });
  });
});

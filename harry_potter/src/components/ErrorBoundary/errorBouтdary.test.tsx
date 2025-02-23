import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
      <MemoryRouter>
        <ErrorBoundary>
          <TestComponentWithError />
        </ErrorBoundary>
      </MemoryRouter>
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
      <MemoryRouter>
        <ErrorBoundary>
          <TestComponentWithError />
        </ErrorBoundary>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Try again')).toBeInTheDocument();
    });
  });
});

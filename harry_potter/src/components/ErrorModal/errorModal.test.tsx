import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { ErrorModal } from '$/components/ErrorModal';

describe('ErrorModal Component', () => {
  const mockOnClose = vi.fn();
  test('renders the error message', () => {
    const error = { message: 'An error occurred' };
    render(<ErrorModal error={error} onClose={mockOnClose} />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  test('calls onClose when button is clicked', () => {
    const error = { message: 'An error occurred' };
    render(<ErrorModal error={error} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });
});

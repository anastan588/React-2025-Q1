import { render, screen, fireEvent } from '@testing-library/react';
import { NotFoundPage } from '$/components/NotFound';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('NotFoundPage Component', () => {
  test('renders the Not Found message', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
  test('navigates to the main page when button is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFoundPage />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /main page/i }));
    expect(container.innerHTML).toMatch(/main page/i);
  });
});

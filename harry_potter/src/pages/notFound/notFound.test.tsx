import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { NotFoundPage } from '$/pages/NotFound';
import { MemoryRouter } from 'react-router';

describe('Detailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render page NotFound', async () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    console.log(screen.getByText('Page not found'));
    expect(screen.getByText('Page not found')).toBeTruthy();
  });
});

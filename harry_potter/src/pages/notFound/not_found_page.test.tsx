import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { NotFoundPage } from '$/pages';

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
    expect(screen.getByText('Page not found')).toBeTruthy();
  });
});

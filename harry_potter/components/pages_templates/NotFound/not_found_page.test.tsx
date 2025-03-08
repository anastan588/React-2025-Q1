import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { NotFound } from '$/components';

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    query: {},
    push: vi.fn(),
  }),
}));

describe('Detailed Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render page NotFound', async () => {
    render(<NotFound />);
    expect(screen.getByText('Page not found')).toBeTruthy();
  });

  test('navigates to main page when button is clicked', () => {
    render(<NotFound />);

    const button = screen.getByText('Main page');
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.queryByText('Page not found')).not.toBeInTheDocument();
    });
  });
});

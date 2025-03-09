import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import NotFoundPage from './not-found';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    pathname: '/',
    query: {},
    push: vi.fn(),
  }),
}));

describe('NotFoundPage Component', () => {
  test('renders the not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page not found'));
  });
});

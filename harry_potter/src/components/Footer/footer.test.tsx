import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Footer } from '$/components/Footer';

describe('Footer Component', () => {
  test('renders footer with correct content', () => {
    render(<Footer />);
    expect(screen.getByText(/anastan588/i));

    expect(screen.getByText(/2025/i));
  });
});

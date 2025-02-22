import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Footer } from '$/components';

describe('Footer Component', () => {
  test('renders footer with correct content', () => {
    render(<Footer />);
    expect(screen.getByText('anastan588'));

    expect(screen.getByText('2025'));
  });
});

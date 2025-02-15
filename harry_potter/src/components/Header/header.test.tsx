import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from '$/components/Header';

describe('Header Component', () => {
  test('renders header with correct content', () => {
    render(<Header />);
    expect(screen.getByAltText('Harry_Potter'));
  });
});

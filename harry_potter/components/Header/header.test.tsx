import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Header } from '$/components';

describe('Header Component', () => {
  test('renders header with correct content', () => {
    render(<Header />);
    expect(screen.getByAltText('Harry_Potter'));
  });
});

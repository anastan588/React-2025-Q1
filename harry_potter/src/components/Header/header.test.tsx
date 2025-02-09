import { render, screen } from '@testing-library/react';
import { Header } from '$/components/Header';
import { describe, expect, test } from 'vitest';

describe('Header Component', () => {
  test('renders header with correct content', () => {
    render(<Header />);
    expect(screen.getByText(/Harry Potter Characters/));
  });
});

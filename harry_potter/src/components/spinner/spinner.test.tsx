import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Spinner } from '$/components/Spinner';
import { describe, expect, test } from 'vitest';

describe('Spinner Component', () => {
  test('renders the spinner', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector('.border-8');
    expect(spinnerElement).toBeInTheDocument();
  });
});

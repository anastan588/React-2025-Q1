import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Spinner } from '$/components/Spinner';

describe('Spinner Component', () => {
  test('renders the spinner', () => {
    const { container } = render(<Spinner />);
    const spinnerElement = container.querySelector('.border-8');
    expect(spinnerElement).toBeInTheDocument();
  });
});

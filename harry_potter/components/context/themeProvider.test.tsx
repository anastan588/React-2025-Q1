import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

import { ThemeContext, ThemeProvider } from '$/components';

describe('ThemeProvider Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('updates localStorage when theme changes', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, setTheme }) => (
            <div>
              <div>{theme}</div>
              <button onClick={() => setTheme('light')}>Set Light Theme</button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const button = screen.getByText('Set Light Theme');
    fireEvent.click(button);

    expect(localStorage.getItem('theme')).toBe('light');
  });
});

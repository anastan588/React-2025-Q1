import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Settings } from '$/components';
import { SoundContext, ThemeContext } from '$/context';

describe('Settings Component', () => {
  const mockSetTheme = vi.fn();
  const mockToggleSound = vi.fn();

  const renderWithContext = (theme = 'light', sound = 'off') => {
    const themeContextValue = { theme, setTheme: mockSetTheme };
    const soundContextValue = { sound, toggleSound: mockToggleSound };

    render(
      <ThemeContext.Provider value={themeContextValue}>
        <SoundContext.Provider value={soundContextValue}>
          <Settings />
        </SoundContext.Provider>
      </ThemeContext.Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('toggles theme when theme icon is clicked', () => {
    renderWithContext('light');
    const themeIcon = screen.getByAltText('dark');
    fireEvent.click(themeIcon);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('toggles sound when sound icon is clicked', () => {
    renderWithContext('light', 'on');
    const soundIcon = screen.getByAltText('sound');
    fireEvent.click(soundIcon);
    expect(mockToggleSound).toHaveBeenCalled();
  });
});

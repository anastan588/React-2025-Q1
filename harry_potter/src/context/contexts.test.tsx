import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';

import { SoundContext, ThemeContext } from './contexts';

const TestSoundComponent = () => {
  const { sound, toggleSound } = useContext(SoundContext);

  return (
    <div>
      <p>Sound is: {sound}</p>
      <button onClick={toggleSound}>Toggle Sound</button>
    </div>
  );
};

describe('SoundContext', () => {
  test('toggles sound correctly', () => {
    const toggleSoundMock = vi.fn();
    render(
      <SoundContext.Provider
        value={{ sound: 'off', toggleSound: toggleSoundMock }}
      >
        <TestSoundComponent />
      </SoundContext.Provider>
    );

    fireEvent.click(screen.getByText('Toggle Sound'));
    expect(toggleSoundMock).toHaveBeenCalled();
  });
});

const TestThemeComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme is: {theme}</p>
      <button onClick={() => setTheme('light')}>Set Light Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('sets theme correctly', () => {
    const setThemeMock = vi.fn();
    render(
      <ThemeContext.Provider value={{ theme: 'dark', setTheme: setThemeMock }}>
        <TestThemeComponent />
      </ThemeContext.Provider>
    );
    fireEvent.click(screen.getByText('Set Light Theme'));
    expect(setThemeMock).toHaveBeenCalledWith('light');
  });
});

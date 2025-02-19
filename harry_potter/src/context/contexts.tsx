import { createContext } from 'react';

export const SoundContext = createContext({
  sound: 'on',
  toggleSound: () => {},
});

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

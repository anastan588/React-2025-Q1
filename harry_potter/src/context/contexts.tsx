import { createContext } from 'react';

import { ThemeContextType } from '$/types';

export const SoundContext = createContext({
  sound: 'off',
  toggleSound: () => {},
});

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

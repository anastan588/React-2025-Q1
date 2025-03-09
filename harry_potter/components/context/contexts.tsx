'use client';
import { createContext } from 'react';

import { ThemeContextType } from '$/components';

export const SoundContext = createContext({
  sound: 'off',
  toggleSound: () => {},
});

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

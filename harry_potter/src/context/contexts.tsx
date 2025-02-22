import React, { createContext } from 'react';

export const SoundContext = createContext({
  sound: 'off',
  toggleSound: () => {},
});

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

import { useEffect, useState } from 'react';

import { ThemeContext } from '$/context';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

import { useContext } from 'react';

import { Icons } from '$/assets';
import { SoundContext, ThemeContext } from '$/context';

export function Settings() {
  const { sound, toggleSound } = useContext(SoundContext);
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className="absolute top-[-5px] left-[30px] flex gap-4 p-3">
      <img
        className="w-15 cursor-pointer"
        src={theme === 'light' ? Icons.Light : Icons.Dark}
        alt="dark"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <img
        className="w-15 cursor-pointer"
        src={sound === 'on' ? Icons.Sound : Icons.NoSound}
        alt="sound"
        onClick={toggleSound}
      />
    </div>
  );
}

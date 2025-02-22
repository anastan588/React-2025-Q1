import { useEffect, useRef, useState } from 'react';

import { Music } from '$/assets/assetsExport';

import { SoundContext } from './contexts';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [sound, setSound] = useState('off');
  const audioElement = useRef(new Audio(Music));

  useEffect(() => {
    audioElement.current.loop = true;
  });

  const toggleSound = () => {
    setSound((prevSound) => {
      const newSound = prevSound === 'on' ? 'off' : 'on';
      if (newSound === 'on') {
        audioElement.current
          .play()
          .catch((error) => console.error('Error playing audio:', error));
      } else {
        audioElement.current.pause();
      }
      return newSound;
    });
  };

  return (
    <SoundContext.Provider value={{ sound, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

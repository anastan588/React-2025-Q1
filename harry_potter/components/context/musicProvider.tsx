'use client';
import { useEffect, useRef, useState } from 'react';

import { SoundContext } from '$/components';
import { Music } from '$/public';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [sound, setSound] = useState('off');
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioElement.current = new Audio(Music.Sound);
    audioElement.current.loop = true;
  });

  const toggleSound = () => {
    setSound((prevSound) => {
      const newSound = prevSound === 'on' ? 'off' : 'on';
      if (newSound === 'on') {
        audioElement.current
          ?.play()
          .catch((error) => console.error('Error playing audio:', error));
      } else {
        audioElement.current?.pause();
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

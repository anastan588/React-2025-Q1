'use client';

import { useEffect, useState } from 'react';

export function useSearchStringLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [query, setQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) as string;
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, query);
    }
  }, [key, query]);

  return [query, setQuery];
}

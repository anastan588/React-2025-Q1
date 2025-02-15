import { useEffect, useState } from 'react';

export function useSearchStringLS(
  key: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem(key) || '';
  });

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [key, query]);

  return [query, setQuery];
}

import { Character, StateProps } from '../../types/types';

import { Card } from '$/components/Card';
import { Outlet } from 'react-router';
import { useEffect } from 'react';

export function CardList({ state }: StateProps) {
  const { searchTerm, pageNumber, charactersList } = state;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber.toString());
    params.delete('search');
    if (searchTerm !== '') {
      params.set('search', searchTerm);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  }, [pageNumber, searchTerm, charactersList]);
  return (
    <div className="flex gap-2.5">
      <div className="grid grid-cols-5 gap-4">
        {charactersList.length === 0 ? (
          <p className="text-dark-yellow self-center text-lg">
            Characters haven&apos;t been found
          </p>
        ) : (
          state.charactersList.map((character: Character) => (
            <Card key={character.id} character={character} />
          ))
        )}
      </div>
      <Outlet />
    </div>
  );
}

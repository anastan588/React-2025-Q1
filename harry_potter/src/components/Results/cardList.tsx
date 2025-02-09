import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Character, StateProps } from '../../types/types';
import { Card } from '$/components/Card';

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
  }, [pageNumber, searchTerm]);
  return (
    <div className="flex gap-2.5">
      <div className="grid gap-4 grid-cols-4">
        {charactersList.length === 0
          ? 'No data'
          : state.charactersList.map((character: Character) => (
              <Card key={character.id} character={character} />
            ))}
      </div>
      <Outlet />
    </div>
  );
}

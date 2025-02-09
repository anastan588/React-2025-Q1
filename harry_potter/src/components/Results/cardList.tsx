import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Character, StateProps } from '../../types/types';
import { Card } from '$/components/Card';

export function CardList({ state }: StateProps) {
  const { searchTerm, pageNumber, charactersList } = state;
  useEffect(() => {
    console.log(searchTerm, 545454545);
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber.toString());
    params.delete('search');
    if (searchTerm !== '') {
      params.set('search', searchTerm);
    }
    console.log(params.toString(), 123);
    window.history.pushState({}, '', `?${params.toString()}`);
    console.log(params.toString(), 123);
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

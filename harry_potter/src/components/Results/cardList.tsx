import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Character } from '../../types/types';
import { Card } from '$/components/Card';

import { DataAppContext } from '../../context/dataAppContext';

interface CardListProps {
  charactersList: Character[];
}

export function CardList({ charactersList }: CardListProps) {
  const { state } = useContext(DataAppContext);
  useEffect(() => {
    console.log(state.searchTerm);
    const params = new URLSearchParams(window.location.search);
    params.set('page', state.pageNumber.toString());
    params.delete('search');
    if (state.searchTerm !== '') {
      params.set('search', state.searchTerm);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
  }, []);
  return (
    <div className="flex gap-2.5">
      <div className="grid gap-4 grid-cols-4">
        {charactersList.map((character: Character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
      <Outlet />
    </div>
  );
}

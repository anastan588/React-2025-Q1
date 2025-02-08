import { Outlet } from 'react-router';
import { Character } from '../types/types';
import { Card } from './resultItem';

interface CardListProps {
  charactersList: Character[];
}

export function CardList({ charactersList }: CardListProps) {
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

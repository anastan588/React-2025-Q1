import { Character } from '../types/types';
import { Card } from './resultItem';

interface CardListProps {
  charactersList: Character[];
}

export function CardList({ charactersList }: CardListProps) {
  console.log(charactersList);
  return (
    <div className="w-full flex flex-col justify-start gap-2 ">
      <div className="w-full flex gap-7.5 border border-white p-2.5 px-4 justify-around rounded-2xl text-xl bg-rose-400 text-white">
        <p className="flex justify-center">Character name</p>
        <p className="flex">More information about character</p>
      </div>
      {charactersList.map((character: Character) => {
        return <Card key={character.id} character={character} />;
      })}
    </div>
  );
}

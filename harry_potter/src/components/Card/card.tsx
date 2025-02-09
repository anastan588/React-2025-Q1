import { Link } from 'react-router';
import { Character } from '$/types';
import { MissCharacter } from '$/assets/assetsExport.ts';

interface CardProps {
  character: Character;
}
export function Card({ character }: CardProps) {
  return (
    <div
      role="article"
      className="flex flex-col gap-1.5 rounded border-2 border-gray-200 p-4 flex flex-col max-h-[520px] max-w-[340px]"
    >
      <img
        src={character.attributes.image || MissCharacter}
        className="rounded-lg h-auto w-auto object-contain object-center max-h-[300px]"
        rel="noreferrer"
      ></img>
      <p className="flex justify-center text-center font-bold">
        {character.attributes.name}
      </p>
      <div className="flex flex-col gap-1.5 my-4">
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Gender:</span>{' '}
          {character.attributes.gender}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Species:</span>{' '}
          {character.attributes.species}
        </p>
      </div>
      <Link
        className="mt-auto text-center bg-secondary rounded-lg py-2 opacity-90 hover:bg-rose-400 hover:text-white bg-slate-50 text-rose-500"
        key={character.id}
        to={`/details/${character.id}`}
      >
        More...
      </Link>
    </div>
  );
}

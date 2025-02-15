import { Link } from 'react-router';

import { Griffindor, MissCharacter, Slitherin } from '$/assets/assetsExport.ts';
import { Character } from '$/types';

interface CardProps {
  character: Character;
}
export function Card({ character }: CardProps) {
  return (
    <div
      role="article"
      className="bg-light-blue/60 flex max-h-116 flex-col justify-between rounded border-2 border-white p-3 text-2xl"
    >
      <div className="flex max-h-40 flex-col justify-center">
        <img
          src={character.attributes.image || MissCharacter}
          className="h-full w-auto rounded-lg object-contain object-center"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="flex justify-center pt-3 text-center font-bold tracking-widest text-white">
          {character.attributes.name}
        </p>
        <div className="my-4 flex flex-col">
          {character.attributes.gender && (
            <div className="flex gap-2.5">
              <img className="max-h-7 max-w-7" src={Griffindor} alt="Gender" />
              <p className="flex flex-col justify-center gap-0.5 text-center">
                {character.attributes.gender}
              </p>
            </div>
          )}
          {character.attributes.species && (
            <div className="flex gap-2.5">
              <img className="max-h-7 max-w-7" src={Slitherin} alt="Species" />
              <p className="flex flex-col justify-center gap-0.5 text-center">
                {character.attributes.species}
              </p>
            </div>
          )}
        </div>
        <Link
          className="text-dark-red hover:bg-dark-red mt-auto rounded-lg bg-slate-50 p-0.5 text-center opacity-90 hover:text-white"
          key={character.id}
          to={`/details/${character.id}`}
        >
          More...
        </Link>
      </div>
    </div>
  );
}

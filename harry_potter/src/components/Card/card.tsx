import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { Griffindor, MissCharacter, Slitherin } from '$/assets/assetsExport.ts';
import { RootState } from '$/data';
import {
  addSelectedCharacters,
  removeSelectedChacters,
} from '$/data/storeSlice';
import { Character } from '$/types';

interface CardProps {
  character: Character;
}
export function Card({ character }: CardProps) {
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.potterData
  );
  const dispatch = useDispatch();

  const handleCheckboxChange = (character: Character) => {
    if (
      selectedCharacters.some(
        (characterFromSelected) => characterFromSelected.id === character.id
      )
    ) {
      dispatch(removeSelectedChacters(character));
    } else {
      dispatch(addSelectedCharacters(character));
    }
  };

  return (
    <div
      role="article"
      className="bg-primary/60 flex max-h-116 flex-col justify-between rounded border-2 border-white p-3 text-2xl"
    >
      <div className="flex max-h-40 flex-col justify-center">
        <img
          src={character.attributes.image || MissCharacter}
          className="h-full w-auto rounded-lg object-contain object-center"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-text-primary flex justify-center pt-3 text-center font-bold tracking-widest">
          {character.attributes.name}
        </p>
        <div className="my-4 flex flex-col">
          <div className="flex justify-center">
            <input
              type="checkbox"
              id="favourite"
              className="accent-accent h-5 w-5"
              checked={selectedCharacters.some(
                (item) => item.id === character.id
              )}
              onChange={() => handleCheckboxChange(character)}
            />
            <label
              htmlFor="favourite"
              className="text-text-secondary ml-2 tracking-wider"
            >
              Add to favourite
            </label>
          </div>
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
          className="text-text-third hover:bg-hover-primary hover:text-text-hover mt-auto rounded-lg bg-white p-0.5 text-center opacity-90"
          key={character.id}
          to={`/details/${character.id}`}
        >
          More...
        </Link>
      </div>
    </div>
  );
}

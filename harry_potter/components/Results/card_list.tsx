'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Card, Character, DetailedCard, RootState } from '$/components';

export function CardList() {
  const { charactersList, detailesOpened } = useSelector(
    (state: RootState) => state.potterData
  );
  const [listLength, setListLength] = useState<number>();

  useEffect(() => {
    if (charactersList.length > 0) {
      setListLength(charactersList.length);
    }
  }, [charactersList.length]);

  return (
    <div className="flex gap-2.5">
      {charactersList.length === 0 ? (
        <p className="text-text-secondary self-center text-lg">
          Characters haven&apos;t been found
        </p>
      ) : (
        <div
          className={`grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:${
            listLength
              ? listLength < 5
                ? ` grid-cols-${listLength.toString()}`
                : `grid-cols-5`
              : `grid-cols-5`
          }`}
        >
          {charactersList.map((character: Character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      )}
      {detailesOpened && <DetailedCard />}
    </div>
  );
}

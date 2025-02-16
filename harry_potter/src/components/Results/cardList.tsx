import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { Character } from '../../types/types';
import { Card } from '$/components/Card';
import { RootState } from '$/data/store';

export function CardList() {
  const { searchTerm, pageNumber, charactersList } = useSelector(
    (state: RootState) => state.potterData
  );
  const [listLength, setListLength] = useState<number>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber.toString());
    params.delete('search');
    if (searchTerm !== '') {
      params.set('search', searchTerm);
    }
    window.history.pushState({}, '', `?${params.toString()}`);
    if (charactersList.length > 0) {
      setListLength(charactersList.length);
    }
  }, [pageNumber, searchTerm, charactersList, charactersList.length]);
  console.log(listLength);
  return (
    <div className="flex gap-2.5">
      {charactersList.length === 0 ? (
        <p className="text-dark-yellow self-center text-lg">
          Characters haven&apos;t been found
        </p>
      ) : (
        <div
          className={
            listLength
              ? listLength < 5
                ? `grid grid-cols-${listLength} gap-4`
                : `grid grid-cols-5 gap-4`
              : `grid grid-cols-5 gap-4`
          }
        >
          {charactersList.map((character: Character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

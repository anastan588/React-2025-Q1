'use client';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, Spinner, updateIsDetailedOpened } from '$/components';
import { Icons } from '$/public';

export function DetailedCard() {
  const navigate = useRouter();

  const { detailedCard, pageNumber, searchTerm, pageSize } = useSelector(
    (state: RootState) => state.potterData
  );

  const dispatch = useDispatch();

  if (!detailedCard) {
    return <Spinner />;
  }
  const handleCloseClick = () => {
    if (searchTerm !== '') {
      navigate.push(
        `/?page=${pageNumber}&search=${searchTerm}&pageSize=${pageSize}`
      );
    } else {
      navigate.push(`/?page=${pageNumber}&pageSize=${pageSize}`);
    }
    dispatch(updateIsDetailedOpened(false));
  };

  return (
    <div
      data-testid="detailed"
      key={detailedCard.id}
      className="bg-primary/70 flex flex-col justify-between gap-1.5 self-start rounded border-2 border-white p-3 tracking-widest"
    >
      <div className="flex max-h-40 flex-col justify-center">
        <img
          src={detailedCard.attributes.image || Icons.MissCharacter}
          className="max-h-40 w-full rounded-lg object-contain object-center"
          alt="character"
        />
      </div>{' '}
      <h3 className="text-center font-bold">
        {detailedCard.attributes.name.toLocaleUpperCase()}
      </h3>
      <div className="flex flex-1 flex-col gap-0.5">
        {detailedCard.attributes.height && (
          <p className="flex gap-0.5">
            <span className="text-text-secondary font-bold">Born: </span>
            {detailedCard.attributes.height}
          </p>
        )}
        {detailedCard.attributes.nationality && (
          <p className="flex gap-0.5">
            <span className="text-text-secondary font-bold">Nationality: </span>
            {detailedCard.attributes.nationality}
          </p>
        )}
        {detailedCard.attributes.house && (
          <p className="flex gap-0.5">
            <span className="text-text-secondary font-bold">House: </span>
            {detailedCard.attributes.house}
          </p>
        )}
        {detailedCard.attributes.blood_status && (
          <p className="flex gap-0.5">
            <span className="text-text-secondary font-bold">
              Blood status:{' '}
            </span>
            {detailedCard.attributes.blood_status}
          </p>
        )}
        {detailedCard.attributes?.alias_names?.length !== 0 && (
          <p className="flex flex-col gap-0.5">
            <span className="text-text-secondary font-bold">Alias names: </span>
            {detailedCard.attributes?.alias_names?.map((alias, index) => (
              <span key={index}>{alias}; </span>
            )) || <span>No aliases available</span>}
          </p>
        )}
        {detailedCard.attributes?.family_members?.length !== 0 && (
          <p className="flex flex-col gap-0.5">
            <span className="text-text-secondary font-bold">
              Family members:{' '}
            </span>
            {detailedCard.attributes?.family_members?.map((member, index) => (
              <span key={index}>{member}; </span>
            )) || <span>No family members available</span>}
          </p>
        )}
        {detailedCard.attributes.wiki && (
          <p className="flex gap-0.5">
            <span className="text-text-secondary font-bold">More info:</span>
            <a
              href={detailedCard.attributes.wiki}
              target="_blank"
              className="text-text-link flex truncate overflow-hidden"
              rel="noreferrer"
            >
              {detailedCard.attributes.wiki}
            </a>
          </p>
        )}
        <button
          className="text-text-closeButton hover:bg-hover-primary hover:text-text-hover mt-auto rounded-lg bg-white py-2 text-center opacity-90"
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
}

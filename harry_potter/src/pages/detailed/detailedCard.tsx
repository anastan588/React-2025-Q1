import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { handleRequestCharacterDetails } from '$/api';
import { MissCharacter } from '$/assets/assetsExport.ts';
import { Spinner } from '$/components/spinner';
import { Character, State, StateProps } from '$/types';

export function DetailedCard({ state, setState }: StateProps) {
  const { id } = useParams<{ id: string }>();
  const [characterDatailes, setCharacterDetailes] = useState<Character>();
  const navigate = useNavigate();

  // setState((prevState: State) => ({
  //   ...prevState,
  //   detailesOpened: true,
  // }));

  useEffect(() => {
    const url = `/?page=${state.pageNumber}&details=${id}`;
    window.history.pushState({}, '', url);
    if (id) {
      try {
        handleRequestCharacterDetails(id).then((response) => {
          setCharacterDetailes(response);
        });
      } catch (error) {
        console.error('Error fetching Character details:', error);
      }
    }
  }, []);

  if (!characterDatailes) {
    return <Spinner />;
  }
  const handleCloseClick = () => {
    navigate(`/?page=${state.pageNumber}`, { replace: true });
    setState((prevState: State) => ({
      ...prevState,
      detailesOpened: false,
    }));
  };

  return (
    <div
      data-testid="detailed"
      key={characterDatailes?.id}
      className="bg-light-blue/70 flex flex-col justify-between gap-1.5 self-start rounded border-2 border-gray-200 p-3 tracking-widest"
    >
      <div className="flex max-h-40 flex-col justify-center">
        <img
          src={characterDatailes.attributes.image || MissCharacter}
          className="max-h-40 w-full rounded-lg object-contain object-center"
          alt="character"
        />
      </div>{' '}
      <h3 className="text-center font-bold">
        {characterDatailes?.attributes.name.toLocaleUpperCase()}
      </h3>
      <div className="flex flex-1 flex-col gap-0.5">
        {characterDatailes?.attributes.height && (
          <p className="flex gap-0.5">
            <span className="text-dark-yellow font-bold">Born: </span>
            {characterDatailes?.attributes.height}
          </p>
        )}
        {characterDatailes?.attributes.nationality && (
          <p className="flex gap-0.5">
            <span className="text-dark-yellow font-bold">Nationality: </span>
            {characterDatailes?.attributes.nationality}
          </p>
        )}
        {characterDatailes?.attributes.house && (
          <p className="flex gap-0.5">
            <span className="text-dark-yellow font-bold">House: </span>
            {characterDatailes?.attributes.house}
          </p>
        )}
        {characterDatailes?.attributes.blood_status && (
          <p className="flex gap-0.5">
            <span className="text-dark-yellow font-bold">Blood status: </span>
            {characterDatailes?.attributes.blood_status}
          </p>
        )}
        {characterDatailes.attributes?.alias_names?.length !== 0 && (
          <p className="flex flex-col gap-0.5">
            <span className="text-dark-yellow font-bold">Alias names: </span>
            {characterDatailes.attributes?.alias_names?.map((alias, index) => (
              <span key={index}>{alias}; </span>
            )) || <span>No aliases available</span>}
          </p>
        )}
        {characterDatailes.attributes?.family_members?.length !== 0 && (
          <p className="flex flex-col gap-0.5">
            <span className="text-dark-yellow font-bold">Family members: </span>
            {characterDatailes.attributes?.family_members?.map(
              (member, index) => <span key={index}>{member}; </span>
            ) || <span>No family members available</span>}
          </p>
        )}
        {characterDatailes?.attributes.wiki && (
          <p className="flex gap-0.5">
            <span className="text-dark-yellow font-bold">More info:</span>
            <a
              href={characterDatailes?.attributes.wiki}
              target="_blank"
              className="text-light-red flex truncate overflow-hidden"
              rel="noreferrer"
            >
              {characterDatailes?.attributes.wiki}
            </a>
          </p>
        )}
        <button
          className="bg-secondary text-dark-red hover:bg-dark-red mt-auto rounded-lg bg-slate-50 py-2 text-center opacity-90 hover:text-white"
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
}

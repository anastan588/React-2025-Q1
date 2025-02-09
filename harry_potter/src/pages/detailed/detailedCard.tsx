import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { handleRequestCharacterDetails } from '$/api';
import { Spinner } from '$/components/Spinner';
import { Character, State, StateProps } from '$/types';
import { MissCharacter } from '$/assets/assetsExport.ts';

export function DetailedCard({ state, setState }: StateProps) {
  const { id } = useParams<{ id: string }>();
  const [characterDatailes, setCharacterDetailes] = useState<Character>();
  const navigate = useNavigate();

  useEffect(() => {
    setState((prevState: State) => ({
      ...prevState,
      detailesOpened: true,
    }));
    const url = `/?page=${state.pageNumber}&details=${id}`;
    window.history.pushState({}, '', url);
    if (id) {
      try {
        handleRequestCharacterDetails(id).then((response) => {
          console.log(response);
          setCharacterDetailes(response);
        });
      } catch (error) {
        console.error('Error fetching Character details:', error);
      }
    }
    console.log(characterDatailes, 5454548878);
    console.log(id);
  }, [characterDatailes, id, setState, state.pageNumber]);

  if (!characterDatailes) {
    console.log(characterDatailes);
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
      className="flex flex-col gap-1.5 rounded border-2 border-gray-200 p-4 flex flex-col self-start"
    >
      <img
        className="rounded-lg h-auto w-auto object-contain object-center max-h-[300px]"
        src={characterDatailes?.attributes.image || MissCharacter}
        alt="character"
      />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-center font-bold">
          {characterDatailes?.attributes.name.toLocaleUpperCase()}
        </h3>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Born:</span>{' '}
          {characterDatailes?.attributes.height}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Nationality:</span>{' '}
          {characterDatailes?.attributes.nationality}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">House:</span>{' '}
          {characterDatailes?.attributes.house}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Blood status:</span>{' '}
          {characterDatailes?.attributes.blood_status}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Alias names:</span>
          {characterDatailes.attributes?.alias_names?.map((alias, index) => (
            <span key={index}>{alias}; </span>
          )) || <span>No aliases available</span>}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">Family members:</span>
          {characterDatailes.attributes?.family_members?.map(
            (member, index) => <span key={index}>{member}; </span>
          ) || <span>No family members available</span>}
        </p>
        <p className="flex flex-col gap-0.5 justify-center text-center text-sm">
          <span className="font-bold">More information:</span>{' '}
          <a
            href={characterDatailes?.attributes.wiki}
            target="_blank"
            className="flex text-teal-800 overflow-hidden truncate"
            rel="noreferrer"
          >
            {characterDatailes?.attributes.wiki}
          </a>
        </p>
        <button
          className="mt-auto text-center bg-secondary rounded-lg py-2 opacity-90 hover:bg-rose-400 hover:text-white bg-slate-50 text-rose-500"
          onClick={handleCloseClick}
        >
          Close
        </button>
      </div>
    </div>
  );
}

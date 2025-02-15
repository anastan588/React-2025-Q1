import React, { useEffect } from 'react';

import { handleRequestForCharacters } from '$/api';
import { useSearchStringLS } from '$/hooks';
import { State, StateProps } from '$/types/types';

export function SearchFieldComponent({ state, setState }: StateProps) {
  const [searchTerm, setSearchTerm] = useSearchStringLS('searchTerm');

  useEffect(() => {
    handleRequestForCharacters({ state, setState });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm: string = event.target.value.toLowerCase();
    console.log(searchTerm);
    setState((prevState: State) => ({
      ...prevState,
      searchTerm: newSearchTerm,
    }));
  };

  const handleSearch = () => {
    setSearchTerm(state.searchTerm);
    setState((prevState: State) => ({
      ...prevState,
      pageNumber: 1,
    }));
    handleRequestForCharacters({ state, setState });
  };

  return (
    <div className="flex justify-center gap-5">
      <input
        className="text-dark-green rounded-lg bg-white p-2.5 px-6 text-lg"
        type="text"
        value={state.searchTerm}
        onChange={handleInputChange}
        placeholder="Search for character"
      />
      <button
        className="bg-dark-red transform rounded-lg p-2.5 px-6 text-lg text-white transition-transform duration-200 ease-in-out hover:scale-110"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

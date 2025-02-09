import React, { useEffect } from 'react';
import { handleRequestForCharacters } from '../../api/api';
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
        className="p-2.5 px-6 rounded-lg text-lg bg-white"
        type="text"
        value={state.searchTerm}
        onChange={handleInputChange}
        placeholder="Search for character"
      />
      <button
        className="p-2.5 px-6 rounded-lg bg-rose-400 text-lg text-white transform hover:scale-110 transition-transform duration-200 ease-in-out"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

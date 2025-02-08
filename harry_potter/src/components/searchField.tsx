import React, { useContext, useEffect } from 'react';
import { handleRequestForCharacters } from '../api/api';
import { DataAppContext } from '../context/dataAppContext';

export function SearchFieldComponent() {
  const {
    state,
    updateSearchTerm,
    updateCharactesList,
    updateLoading,
    updateShowModal,
    updateErrorMessage,
  } = useContext(DataAppContext);

  useEffect(() => {
    handleRequestForCharacters(
      state,
      updateCharactesList,
      updateLoading,
      updateShowModal,
      updateErrorMessage
    );
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm: string = event.target.value.toLowerCase();
    updateSearchTerm(newSearchTerm);
  };

  const handleSearch = () => {
    localStorage.setItem('searchTerm', state.searchTerm);
    handleRequestForCharacters(
      state,
      updateCharactesList,
      updateLoading,
      updateShowModal,
      updateErrorMessage
    );
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

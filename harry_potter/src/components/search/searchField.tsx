import React, { useContext, useEffect } from 'react';
import { handleRequestForCharacters } from '../../api/api';
import { DataAppContext } from '../../context/dataAppContext';
import useSearchStringLS from '../../hooks/useSearchStringLS';

export function SearchFieldComponent() {
  const [searchTerm, setSearchTerm] = useSearchStringLS('searchTerm');
  const {
    state,
    updateSearchTerm,
    updateCharactesList,
    updateLoading,
    updateShowModal,
    updateErrorMessage,
    updatePageNumber,
    updateRecords,
  } = useContext(DataAppContext);

  useEffect(() => {
    handleRequestForCharacters(
      state,
      updateCharactesList,
      updateLoading,
      updateShowModal,
      updateErrorMessage,
      updateRecords
    );
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm: string = event.target.value.toLowerCase();
    console.log(searchTerm);
    updateSearchTerm(newSearchTerm);
  };

  const handleSearch = () => {
    setSearchTerm(state.searchTerm);
    updatePageNumber(1);
    handleRequestForCharacters(
      state,
      updateCharactesList,
      updateLoading,
      updateShowModal,
      updateErrorMessage,
      updateRecords
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

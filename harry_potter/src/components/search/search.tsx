import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '$/data/store';
import { updatePageNumber, updateSerchTerm } from '$/data/storeSlice';
import { useSearchStringLS } from '$/hooks';

export function SearchFieldComponent() {
  const [searchTermInComponent, setSearchTermInComponent] =
    useSearchStringLS('searchTerm');
  const { searchTerm } = useSelector((state: RootState) => state.potterData);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchTermInComponent(searchTerm);
  }, [searchTerm, setSearchTermInComponent]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermInComponent(event.target.value.toLowerCase());
  };

  const handleSearch = () => {
    dispatch(updateSerchTerm(searchTermInComponent));
    dispatch(updatePageNumber(1));
  };

  return (
    <div className="flex justify-center gap-5">
      <input
        className="text-dark-green rounded-lg bg-white p-2.5 px-6 text-lg"
        type="text"
        value={searchTermInComponent}
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

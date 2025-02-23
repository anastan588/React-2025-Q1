import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeContext } from '$/context';
import { RootState, updatePageNumber, updateSerchTerm } from '$/data';
import { useSearchStringLS } from '$/hooks';

export function SearchFieldComponent() {
  const [searchTermInComponent, setSearchTermInComponent] =
    useSearchStringLS('searchTerm');
  const { searchTerm } = useSelector((state: RootState) => state.potterData);
  const { theme } = useContext(ThemeContext);
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
        className="text-text-input rounded-lg bg-white p-2.5 px-6 text-lg"
        type="text"
        value={searchTermInComponent}
        onChange={handleInputChange}
        placeholder="Search for character"
      />
      <button
        data-theme={theme}
        className="bg-search transform rounded-lg p-2.5 px-6 text-lg text-white transition-transform duration-200 ease-in-out hover:scale-110"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

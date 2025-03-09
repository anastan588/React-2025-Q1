'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  ThemeContext,
  updatePageNumber,
  updateSerchTerm,
  useSearchStringLS,
} from '$/components';

export function SearchFieldComponent() {
  const [searchTermInComponent, setSearchTermInComponent] =
    useSearchStringLS('searchTerm');
  const { searchTerm, pageSize } = useSelector(
    (state: RootState) => state.potterData
  );
  const navigate = useRouter();
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
    navigate.push(
      `/?page=${1}&search=${searchTermInComponent}&pageSize=${pageSize}`
    );
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

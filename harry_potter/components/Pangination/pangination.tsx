'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, updatePageNumber, updatePageSize } from '$/components';

export function Pangination() {
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrev, setDisabledPrev] = useState<boolean>(false);
  const { pageNumber, records, pageSize, searchTerm } = useSelector(
    (state: RootState) => state.potterData
  );
  const navigate = useRouter();
  const dispatch = useDispatch();
  const numberOfCharactersOnPage = [10, 20, 30, 50, 70, 100, 150];

  useEffect(() => {
    const disableNext =
      pageNumber === Math.ceil(records / pageSize) ? true : false;
    setDisabledNext(disableNext);
    const disablePrev = pageNumber === 1 ? true : false;
    setDisabledPrev(disablePrev);
  }, [pageNumber, pageSize, records]);

  const handlePrevPage = async () => {
    if (pageNumber > 1) {
      dispatch(updatePageNumber(pageNumber - 1));
      navigate.push(
        `/?page=${pageNumber - 1}&search=${searchTerm}&pageSize=${pageSize}`
      );
    }
  };
  const handleNextPage = async () => {
    dispatch(updatePageNumber(pageNumber + 1));
    navigate.push(
      `/?page=${pageNumber + 1}&search=${searchTerm}&pageSize=${pageSize}`
    );
  };

  const handleChangePageSize = (value: string) => {
    dispatch(updatePageSize(parseInt(value)));
    navigate.push(
      `/?page=${pageNumber}&search=${searchTerm}&pageSize=${value}`
    );
  };

  return (
    records !== 0 && (
      <div className="flex w-[100%] justify-between">
        <div className="flex gap-3">
          <button
            className={`hover:bg-hover-secondary hover:text-text-hover self-end rounded-lg bg-white px-6 py-2.5 text-[120%] ${disabledPrev ? 'pointer-events-none text-white' : 'text-text-input'}`}
            onClick={handlePrevPage}
            disabled={disabledPrev}
          >
            Prev page
          </button>
          <p className="text-text-secondary flex items-center p-1 text-center">
            {pageNumber} of {Math.ceil(records / pageSize)} pages
          </p>
          <button
            className={`hover:bg-hover-secondary hover:text-text-hover self-end rounded-lg bg-white px-6 py-2.5 text-[120%] ${
              disabledNext
                ? 'pointer-events-none text-white'
                : 'text-text-input'
            }`}
            onClick={handleNextPage}
            disabled={disabledNext}
          >
            Next page
          </button>
        </div>
        <div className="text-text-secondary flex items-center gap-3">
          <p>Characters on page:</p>
          <select
            className="bg-primary"
            value={pageSize}
            onChange={(event) => handleChangePageSize(event.target.value)}
          >
            {numberOfCharactersOnPage.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  );
}

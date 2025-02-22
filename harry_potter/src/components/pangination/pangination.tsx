import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '$/data/store';
import { updatePageNumber } from '$/data/storeSlice';

export function Pangination() {
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrev, setDisabledPrev] = useState<boolean>(false);
  const { pageNumber, records, pageSize } = useSelector(
    (state: RootState) => state.potterData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const disableNext =
      pageNumber === Math.ceil(records / pageSize) ? true : false;
    setDisabledNext(disableNext);
    const disablePrev = pageNumber === 1 ? true : false;
    setDisabledPrev(disablePrev);
  }, [pageNumber, pageSize, records]);

  const handlePrevPage = async () => {
    console.log('prev');
    if (pageNumber > 1) {
      dispatch(updatePageNumber(pageNumber - 1));
    }
  };
  const handleNextPage = async () => {
    dispatch(updatePageNumber(pageNumber + 1));
  };
  return (
    <div className="flex gap-3 self-start">
      <button
        className={`hover:bg-hover-secondary hover:text-text-hover self-end rounded-lg bg-white px-6 py-2.5 text-[120%] ${disabledPrev ? 'pointer-events-none text-white' : 'text-text-fifth'}`}
        onClick={handlePrevPage}
        disabled={disabledPrev}
      >
        Prev page
      </button>
      <button
        className={`hover:bg-hover-secondary hover:text-text-hover self-end rounded-lg bg-white px-6 py-2.5 text-[120%] ${
          disabledNext ? 'pointer-events-none text-white' : 'text-text-fifth'
        }`}
        onClick={handleNextPage}
        disabled={disabledNext}
      >
        Next page
      </button>
    </div>
  );
}

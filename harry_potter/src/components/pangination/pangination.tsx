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

  useEffect(() => {
    const disableNext =
      pageNumber === Math.ceil(records / pageSize) ? true : false;
    setDisabledNext(disableNext);
    const disablePrev = pageNumber === 1 ? true : false;
    setDisabledPrev(disablePrev);
  }, [pageNumber, pageSize, records]);
  const dispatch = useDispatch();

  const handlePrevPage = async () => {
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
        className={`hover:bg-dark-green self-end rounded-lg bg-slate-50 px-6 py-2.5 text-[120%] hover:text-white ${disabledPrev ? 'pointer-events-none text-white' : 'text-dark-green'}`}
        onClick={handlePrevPage}
        disabled={disabledPrev}
      >
        Prev page
      </button>
      <button
        className={`hover:bg-dark-green self-end rounded-lg bg-slate-50 px-6 py-2.5 text-[120%] hover:text-white ${
          disabledNext ? 'pointer-events-none text-white' : 'text-dark-green'
        }`}
        onClick={handleNextPage}
        disabled={disabledNext}
      >
        Next page
      </button>
    </div>
  );
}

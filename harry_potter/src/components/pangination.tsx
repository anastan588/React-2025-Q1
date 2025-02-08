import { useContext, useEffect, useState } from 'react';
import { DataAppContext } from '../context/dataAppContext';

export function Pangination() {
  const { state, updatePageNumber } = useContext(DataAppContext);
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrev, setDisabledPrev] = useState<boolean>(false);
  console.log(state.charactersList);
  console.log(Math.ceil(state.charactersList.length / state.pageSize));

  useEffect(() => {
    const disableNext =
      state.pageNumber === Math.ceil(state.records / state.pageSize)
        ? true
        : false;
    setDisabledNext(disableNext);
    const disablePrev = state.pageNumber === 1 ? true : false;
    setDisabledPrev(disablePrev);
  }, []);

  const handlePrevPage = () => {
    if (state.pageNumber > 1) {
      updatePageNumber(state.pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    updatePageNumber(state.pageNumber + 1);
  };
  return (
    <div className="flex gap-3 self-start">
      <button
        className={`self-end rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] hover:bg-rose-400 hover:text-white ${disabledPrev ? 'pointer-events-none text-rose-100' : 'text-rose-500'}`}
        onClick={handlePrevPage}
        disabled={disabledPrev}
      >
        Prev page
      </button>
      <button
        className={`self-end rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] hover:bg-rose-400  hover:text-white ${
          disabledNext ? 'pointer-events-none text-rose-100' : 'text-rose-500'
        }`}
        onClick={handleNextPage}
        disabled={disabledNext}
      >
        Next page
      </button>
    </div>
  );
}

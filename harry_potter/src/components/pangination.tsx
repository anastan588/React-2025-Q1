import { useContext } from 'react';
import { DataAppContext } from '../context/dataAppContext';

export function Pangination() {
  const { state, updatePageNumber } = useContext(DataAppContext);

  const handlePrevPage = () => {
    if (state.pageNumber > 1) {
      updatePageNumber(state.pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    console.log('popka');
    updatePageNumber(state.pageNumber + 1);
  };
  return (
    <div className="flex gap-3 self-start">
      <button
        className={`self-end rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] hover:bg-rose-400 hover:text-white ${state.pageNumber === 1 ? 'pointer-events-none text-rose-100' : 'text-rose-500'}`}
        onClick={handlePrevPage}
        disabled={state.pageNumber === 1}
      >
        Prev page
      </button>
      <button
        className={`self-end rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] hover:bg-rose-400  hover:text-white ${
          state.pageNumber !== 1
            ? state.pageNumber ===
              Math.ceil(state.charactersList.length / state.pageSize)
              ? 'pointer-events-none text-rose-100'
              : 'text-rose-500'
            : 'text-rose-500'
        }`}
        onClick={handleNextPage}
        disabled={
          state.pageNumber !== 1
            ? state.pageNumber ===
              Math.ceil(state.charactersList.length / state.pageSize)
            : false
        }
      >
        Next page
      </button>
    </div>
  );
}

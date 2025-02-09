import { useEffect, useState } from 'react';
import { handleRequestForCharacters } from '$/api/api';
import { State, StateProps } from '$/types/types';

export function Pangination({ state, setState }: StateProps) {
  const [disabledNext, setDisabledNext] = useState<boolean>(false);
  const [disabledPrev, setDisabledPrev] = useState<boolean>(false);
  const { pageNumber, records, pageSize } = state;

  useEffect(() => {
    const disableNext =
      pageNumber === Math.ceil(records / pageSize) ? true : false;
    setDisabledNext(disableNext);
    const disablePrev = pageNumber === 1 ? true : false;
    setDisabledPrev(disablePrev);
  }, [pageNumber, pageSize, records]);

  const handlePrevPage = async () => {
    if (state.pageNumber > 1) {
      setState((prevState: State) => ({
        ...prevState,
        pageNumber: prevState.pageNumber - 1,
      }));
      await handleRequestForCharacters({ state, setState });
    }
  };
  const handleNextPage = async () => {
    setState((prevState: State) => ({
      ...prevState,
      pageNumber: prevState.pageNumber + 1,
    }));
    await handleRequestForCharacters({ state, setState });
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

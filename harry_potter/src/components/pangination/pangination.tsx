import { State, StateProps } from '$/types/types';
import { useEffect, useState } from 'react';

import { handleRequestForCharacters } from '$/api/api';

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
    if (pageNumber > 1) {
      setState((prevState: State) => {
        const updatedState = {
          ...prevState,
          pageNumber: pageNumber - 1,
        };
        handleRequestForCharacters({ state: updatedState, setState });
        return updatedState;
      });
    }
  };
  const handleNextPage = async () => {
    setState((prevState: State) => {
      const updatedState = {
        ...prevState,
        pageNumber: pageNumber + 1,
      };
      handleRequestForCharacters({ state: updatedState, setState });
      return updatedState;
    });
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

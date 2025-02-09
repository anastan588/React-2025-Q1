import { useEffect, useState } from 'react';
import { State, StateProps } from '$/types/types';
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
  // useEffect(() => {
  //   const disableNext =
  //     state.pageNumber === Math.ceil(state.records / state.pageSize)
  //       ? true
  //       : false;
  //   setDisabledNext(disableNext);
  //   const disablePrev = state.pageNumber === 1 ? true : false;
  //   setDisabledPrev(disablePrev);
  // }, []);

  const handlePrevPage = () => {
    if (state.pageNumber > 1) {
      return new Promise<State>((resolve) => {
        setState((prevState) => {
          const newState = {
            ...prevState,
            pageNumber: prevState.pageNumber - 1,
          };
          resolve(newState);
          return newState;
        });
      }).then(() => handleRequestForCharacters({ state, setState }));
    }
  };
  const handleNextPage = async () => {
    return new Promise<State>((resolve) => {
      setState((prevState) => {
        console.log(prevState);
        const newState = {
          ...prevState,
          pageNumber: prevState.pageNumber + 1,
        };
        resolve(newState);
        return newState;
      });
    }).then((state) => {
      console.log(state);
      handleRequestForCharacters({ state, setState });
    });
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

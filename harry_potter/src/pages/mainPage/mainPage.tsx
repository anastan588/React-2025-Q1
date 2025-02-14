import { useNavigate } from 'react-router';
import { ErrorModal } from '$/components/ErrorModal';
import { Footer } from '$/components/Footer';
import { Header } from '$/components/Header';
import { SearchFieldComponent } from '$/components/Search';
import { Spinner } from '$/components/Spinner';
import { CardList } from '$/components/Results';
import { Pangination } from '$/components/Pangination';
import { State, StateProps } from '$/types/types';

export function MainPage({ state, setState }: StateProps) {
  const navigate = useNavigate();

  const throwError = () => {
    console.log('error');
    setState((prevState: State) => ({
      ...prevState,
      errorThrow: true,
    }));
    throw new Error('This is a test error');
  };

  const closeError = () => {
    setState((prevState: State) => ({
      ...prevState,
      showErrorModal: false,
    }));
  };

  if (state.errorThrow) {
    throw new Error('This is a test error');
  }

  const handleDetailesClose: React.MouseEventHandler<HTMLElement> = (event) => {
    const currentTarget = event.target as HTMLElement;
    if (currentTarget) {
      if (currentTarget.innerText !== 'More...') {
        navigate(`/?page=${state.pageNumber}`, { replace: true });
      }
    }
    // setState((prevState: State) => ({
    //   ...prevState,
    //   detailesOpened: false,
    // }));
  };

  return (
    <div
      className="relative flex flex-col items-center bg-teal-300 gap-7 h-full relative min-h-screen"
      onClick={handleDetailesClose}
    >
      <Header />
      <main className="flex-1 flex flex-col items-center gap-4 p-0 px-5 pb-[60px] w-full max-w-screen">
        <SearchFieldComponent state={state} setState={setState} />
        {!state.loading && <Pangination state={state} setState={setState} />}
        {state.loading ? (
          <Spinner />
        ) : state.showErrorModal ? (
          <ErrorModal error={state.error} onClose={closeError} />
        ) : (
          <CardList state={state} setState={setState} />
        )}

        <button
          className="fixed right-[20px] bottom-[50px] border-2 border-white rounded-lg py-2 px-3 bg-slate-50 text-rose-500 hover:bg-rose-400 hover:text-white"
          onClick={throwError}
        >
          Throw Error
        </button>
      </main>
      <Footer />
    </div>
  );
}

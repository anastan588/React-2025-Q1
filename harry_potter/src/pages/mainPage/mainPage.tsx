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
  // const { state, updateDetailesOpened, updateErrorThrow, updateShowModal } =
  //   useContext(DataAppContext);

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

  const handleDetailesClose = () => {
    if (state.detailesOpened) {
      setState((prevState: State) => ({
        ...prevState,
        detailesOpened: false,
      }));
      navigate(`/?page=${state.pageNumber}`, { replace: true });
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-teal-300 gap-7 h-full relative min-h-screen">
      <Header />
      <main
        className="flex-1 flex flex-col items-center gap-4 p-0 px-5 pb-[60px] w-full max-w-screen"
        onClick={handleDetailesClose}
      >
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

import { useContext } from 'react';
import { ErrorModal } from './errorModal';
import { Footer } from './footer';
import { Header } from './header';
import { SearchFieldComponent } from './searchField';
import { Spinner } from './spinner';
import { DataAppContext } from '../context/dataAppContext';
import { CardList } from './searchResults';
import { Pangination } from './pangination';
import { useNavigate } from 'react-router';

export function MainPage() {
  const { state, updateDetailesOpened, updateErrorThrow, updateShowModal } =
    useContext(DataAppContext);
  const navigate = useNavigate();

  const throwError = () => {
    console.log('error');
    updateErrorThrow(true);
    throw new Error('This is a test error');
  };

  const closeError = () => {
    updateShowModal(false);
  };

  if (state.errorThrow) {
    throw new Error('This is a test error');
  }

  const handleDetailesClose = () => {
    if (state.detailesOpened) {
      updateDetailesOpened(false);
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
        <SearchFieldComponent />
        {!state.loading && <Pangination />}
        {state.loading ? (
          <Spinner />
        ) : state.showErrorModal ? (
          <ErrorModal error={state.error} onClose={closeError} />
        ) : (
          <CardList charactersList={state.charactersList} />
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

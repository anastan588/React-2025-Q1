import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ErrorModal } from '$/components/ErrorModal';
import { Footer } from '$/components/Footer';
import { Header } from '$/components/Header';
import { SearchFieldComponent } from '$/components/Search';
import { Spinner } from '$/components/Spinner';
import { DataAppContext } from '../../context/dataAppContext';
import { CardList } from '$/components/Results';
import { Pangination } from '$/components/Pangination';

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

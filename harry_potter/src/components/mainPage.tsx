import { useContext } from 'react';
import { ErrorModal } from './errorModal';
import { Footer } from './footer';
import { Header } from './header';
import { SearchFieldComponent } from './searchField';
import { Spinner } from './spinner';
import { DataAppContext } from '../context/dataAppContext';
import { CardList } from './searchResults';
import { Pangination } from './pangination';

export function MainPage() {
  const state = useContext(DataAppContext);

  const throwError = () => {
    console.log('error');
    state.updateErrorThrow(true);
    throw new Error('This is a test error');
  };

  const closeError = () => {
    state.updateShowModal(false);
  };

  if (state.state.errorThrow) {
    throw new Error('This is a test error');
  }

  return (
    <div className="relative flex flex-col items-center bg-teal-300 gap-7 h-full relative min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-4 p-0 px-5 pb-[60px] w-full max-w-screen">
        <SearchFieldComponent />
        {!state.state.loading && <Pangination />}
        {state.state.loading ? (
          <Spinner />
        ) : state.state.showErrorModal ? (
          <ErrorModal error={state.state.error} onClose={closeError} />
        ) : (
          <CardList charactersList={state.state.charactersList} />
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

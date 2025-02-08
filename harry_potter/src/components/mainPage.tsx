import { useContext } from 'react';
import { ErrorModal } from './errorModal';
import { Footer } from './footer';
import { Header } from './header';
import { SearchFieldComponent } from './searchField';
import { Spinner } from './spinner';
import { DataAppContext } from '../context/dataAppContext';
import { CardList } from './searchResults';

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
    <div className="flex flex-col items-center bg-teal-300 gap-7 h-full relative min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-4 p-0 px-5 w-full max-w-screen">
        <SearchFieldComponent />
        {state.state.loading ? (
          <Spinner />
        ) : state.state.showErrorModal ? (
          <ErrorModal error={state.state.error} onClose={closeError} />
        ) : (
          <CardList charactersList={state.state.charactersList} />
        )}
        <button
          className="self-end border-2 border-white rounded-lg py-2.5 px-6 bg-slate-50 text-[120%] text-rose-500"
          onClick={throwError}
        >
          Throw Error
        </button>
      </main>
      <Footer />
    </div>
  );
}

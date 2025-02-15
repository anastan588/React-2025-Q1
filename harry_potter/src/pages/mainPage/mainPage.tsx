import { useNavigate } from 'react-router';

import { Cathle, Snow } from '$/assets/assetsExport';
import { ErrorModal } from '$/components/ErrorModal';
import { Footer } from '$/components/Footer';
import { Header } from '$/components/Header';
import { Pangination } from '$/components/pangination';
import { CardList } from '$/components/Results';
import { SearchFieldComponent } from '$/components/search';
import { Spinner } from '$/components/spinner';
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
      className="bg-light-blue relative flex h-full min-h-screen flex-col items-center bg-contain bg-center"
      onClick={handleDetailesClose}
      style={{
        backgroundImage: `url(${Snow})`,
      }}
    >
      <Header />
      <main
        className="flex w-full max-w-screen flex-1 flex-col items-center gap-4 bg-cover bg-fixed px-5 pt-5 pb-[60px] text-white"
        style={{
          backgroundImage: `url(${Cathle})`,
        }}
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
          className="text-dark-red hover:bg-dark-red fixed right-[20px] bottom-[50px] rounded-lg border-2 border-white bg-slate-50 px-3 py-2 hover:text-white"
          onClick={throwError}
        >
          Throw Error
        </button>
      </main>
      <Footer />
    </div>
  );
}

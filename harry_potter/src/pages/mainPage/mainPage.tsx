import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Cathle, Snow } from '$/assets/assetsExport';
import {
  CardList,
  ErrorModal,
  Footer,
  Header,
  Pangination,
  SearchFieldComponent,
  Spinner,
} from '$/components';
import { potterApi, RootState } from '$/data';
import {
  updateIsDetailedOpened,
  updateLoading,
  updateShowErrorMessageWindow,
} from '$/data/storeSlice';

export function MainPage() {
  const {
    searchTerm,
    pageNumber,
    pageSize,
    loading,
    showErrorModal,
    error,
    charactersList,
  } = useSelector((state: RootState) => state.potterData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorThrownInMain, setErrorThrownInMain] = useState(false);

  const { refetch } = potterApi.endpoints.getCharacters.useQuery({
    searchTerm: searchTerm,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
    if (searchTerm || charactersList.length === 0) {
      dispatch(updateLoading(true));
    }
  }, [charactersList.length, dispatch, pageNumber, refetch, searchTerm]);

  const throwError = () => {
    setErrorThrownInMain(true);
    throw new Error('This is a test error');
  };

  const closeError = () => {
    dispatch(updateShowErrorMessageWindow(false));
  };

  if (errorThrownInMain) {
    throw new Error('This is a test error');
  }

  const handleDetailesClose: React.MouseEventHandler<HTMLElement> = (event) => {
    const currentTarget = event.target as HTMLElement;
    if (currentTarget) {
      if (currentTarget.innerText !== 'More...') {
        navigate(`/?page=${pageNumber}`, { replace: true });
      }
    }
    dispatch(updateIsDetailedOpened(false));
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
        <SearchFieldComponent />
        {loading ? (
          <Spinner />
        ) : showErrorModal ? (
          <ErrorModal error={error} onClose={closeError} />
        ) : (
          <>
            <Pangination />
            <CardList />
          </>
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

import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { potterApi } from '$/api';
import { Castle, Castle2, Snow } from '$/assets/assetsExport';
import {
  CardList,
  ErrorModal,
  FlyoutElement,
  Footer,
  Header,
  Pangination,
  SearchFieldComponent,
  Settings,
  Spinner,
} from '$/components';
import { ThemeContext } from '$/context';
import { RootState } from '$/data';
import { updateIsDetailedOpened, updateShowErrorMessageWindow } from '$/data';

export function MainPage() {
  const {
    searchTerm,
    pageNumber,
    pageSize,
    loading,
    showErrorModal,
    error,
    selectedCharacters,
  } = useSelector((state: RootState) => state.potterData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorThrownInMain, setErrorThrownInMain] = useState(false);
  const { theme } = useContext(ThemeContext);

  potterApi.endpoints.getCharacters.useQuery({
    searchTerm: searchTerm,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

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
      data-theme={theme}
      className="bg-primary text-text-primary relative flex h-full min-h-screen flex-col items-center bg-contain bg-center"
      onClick={handleDetailesClose}
      style={{
        backgroundImage: `url(${Snow})`,
      }}
    >
      <Header />
      <main
        className={`flex w-full max-w-screen flex-1 flex-col items-center gap-4 ${theme === 'light' ? 'bg-cover bg-center bg-no-repeat' : 'bg-cover'} bg-fixed px-5 pt-5 pb-[60px]`}
        style={{
          backgroundImage: `url(${theme === 'light' ? Castle2 : Castle})`,
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
        {selectedCharacters.length !== 0 && <FlyoutElement />}
        <Settings />
        <button
          className="text-text-errorButton hover:bg-hover-errorButton hover:text-text-hover fixed right-[20px] bottom-[50px] rounded-lg border-2 border-white bg-white px-3 py-2"
          onClick={throwError}
        >
          Throw Error
        </button>
      </main>
      <Footer />
    </div>
  );
}

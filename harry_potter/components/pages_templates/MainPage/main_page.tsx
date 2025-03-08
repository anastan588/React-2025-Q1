import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppDispatch,
  CardList,
  ErrorModal,
  FlyoutElement,
  Footer,
  Header,
  Pangination,
  RootState,
  SearchFieldComponent,
  Settings,
  Spinner,
  ThemeContext,
  updateIsDetailedOpened,
  updateShowErrorMessageWindow,
} from '$/components';
import { Images } from '$/public';

export function MainPage() {
  const {
    pageNumber,
    loading,
    showErrorModal,
    error,
    selectedCharacters,
    searchTerm,
    pageSize,
  } = useSelector((state: RootState) => state.potterData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const [errorThrownInMain, setErrorThrownInMain] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);
  const state = useSelector((state: RootState) => state.potterData);
  useEffect(() => {
    if (state) {
      setMounted(true);
      if (searchTerm !== '') {
        navigate.replace(`/?page=${pageNumber}&search=${searchTerm}`);
      } else {
        navigate.replace(`/?page=${pageNumber}`);
      }
    }
  }, [mounted, pageNumber, searchTerm]);

  const throwError = () => {
    setErrorThrownInMain(true);
  };

  const closeError = () => {
    dispatch(updateShowErrorMessageWindow(false));
  };

  if (errorThrownInMain) {
    throw new Error('This is a test error');
  }

  const handleDetailesClose: React.MouseEventHandler<HTMLElement> = (event) => {
    const currentTarget = event.target as HTMLElement;
    event.stopPropagation();
    if (currentTarget) {
      if (
        currentTarget.innerText !== 'More...' &&
        currentTarget.getAttribute('id') != 'favourite' &&
        currentTarget.innerText !== 'Prev page' &&
        currentTarget.innerText !== 'Next page' &&
        currentTarget.tagName.toLowerCase() !== 'select' &&
        currentTarget.tagName.toLowerCase() !== 'input' &&
        currentTarget.tagName.toLowerCase() !== 'a'
      ) {
        if (searchTerm !== '') {
          navigate.replace(
            `/?page=${pageNumber}&search=${searchTerm}&pageSize=${pageSize}`
          );
        } else {
          navigate.replace(`/?page=${pageNumber}&pageSize=${pageSize}`);
        }
        dispatch(updateIsDetailedOpened(false));
      }
    }
  };

  return (
    <div
      data-theme={theme}
      className="bg-primary text-text-primary relative flex h-full min-h-screen flex-col items-center bg-contain bg-center"
      style={{
        backgroundImage: `url(${Images.Snow})`,
      }}
    >
      <Header />
      {mounted && (
        <main
          id="main"
          className={`flex w-full max-w-screen flex-1 flex-col items-center gap-4 ${theme === 'light' ? 'bg-cover bg-center bg-no-repeat' : 'bg-cover'} bg-fixed px-5 pt-5 pb-[60px]`}
          style={{
            backgroundImage: `url(${theme === 'light' ? Images.Castle2 : Images.Castle})`,
          }}
          onClick={handleDetailesClose}
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
      )}
      <Footer />
    </div>
  );
}

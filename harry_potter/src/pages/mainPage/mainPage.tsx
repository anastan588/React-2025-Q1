import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { potterApi } from '$/api';
import {
  Castle,
  Castle2,
  Dark,
  Light,
  NoSound,
  Snow,
  Sound,
} from '$/assets/assetsExport';
import {
  CardList,
  ErrorModal,
  FlyoutElement,
  Footer,
  Header,
  Pangination,
  SearchFieldComponent,
  Spinner,
} from '$/components';
import { SoundContext, ThemeContext } from '$/context';
import { RootState } from '$/data';
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
    selectedCharacters,
  } = useSelector((state: RootState) => state.potterData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorThrownInMain, setErrorThrownInMain] = useState(false);
  const { sound, toggleSound } = useContext(SoundContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const { refetch } = potterApi.endpoints.getCharacters.useQuery({
    searchTerm: searchTerm,
    pageNumber: pageNumber,
    pageSize: pageSize,
  });

  useEffect(() => {
    console.log('sezrc', searchTerm);
    if (searchTerm) {
      console.log('sezrc1', searchTerm);
      refetch();
    }
    if (pageNumber) {
      console.log('page1', searchTerm);
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
        <div className="absolute top-[-5px] left-[30px] flex gap-4 p-3">
          <img
            className="w-15 cursor-pointer"
            src={theme === 'light' ? Light : Dark}
            alt="dark"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <img
            className="w-15 cursor-pointer"
            src={sound === 'on' ? Sound : NoSound}
            alt="sound"
            onClick={toggleSound}
          />
        </div>
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

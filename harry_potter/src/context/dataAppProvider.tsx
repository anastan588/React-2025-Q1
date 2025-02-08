import { useState } from 'react';
import { DataAppContext, initialState } from './dataAppContext';
import { Character, DataAppProviderProps, State } from '../types/types';
import { handleRequestForCharacters } from '../api/api';

export function DataAppProvider({ children }: DataAppProviderProps) {
  const [state, setState] = useState(initialState);

  const updateSearchTerm = (newTerm: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: newTerm,
    }));
  };
  const updatePageNumber = async (newPageNumber: number) => {
    console.log(newPageNumber);
    return new Promise<State>((resolve) => {
      setState((prevState) => {
        const newState = {
          ...prevState,
          pageNumber: newPageNumber,
        };
        resolve(newState);
        return newState;
      });
    }).then((newState) =>
      handleRequestForCharacters(
        newState,
        updateCharactesList,
        updateLoading,
        updateShowModal,
        updateErrorMessage
      )
    );
  };
  const updateCharactesList = (newCharactersList: Character[]) => {
    setState((prevState) => ({
      ...prevState,
      charactersList: newCharactersList,
    }));
  };
  const updateErrorThrow = (condition: boolean) => {
    setState((prevState) => ({
      ...prevState,
      errorThrow: condition,
    }));
  };
  const updateShowModal = (condition: boolean) => {
    setState((prevState) => ({
      ...prevState,
      showErrorModal: condition,
    }));
  };
  const updateLoading = (condition: boolean) => {
    setState((prevState) => ({
      ...prevState,
      loading: condition,
    }));
  };
  const updateErrorMessage = (message: string, stack: string) => {
    setState((prevState) => ({
      ...prevState,
      error: {
        message,
        stack,
      },
    }));
  };
  return (
    <DataAppContext.Provider
      value={{
        state,
        updateSearchTerm,
        updateCharactesList,
        updateErrorThrow,
        updateShowModal,
        updateLoading,
        updateErrorMessage,
        updatePageNumber,
      }}
    >
      {children}
    </DataAppContext.Provider>
  );
}

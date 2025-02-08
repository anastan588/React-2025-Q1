import { createContext } from 'react';
import { DataAppContextType, State } from '../types/types';

export const initialState: State = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  charactersList: [],
  loading: false,
  error: {
    message: '',
    stack: '',
  },
  showErrorModal: false,
  errorThrow: false,
  pageNumber: 1,
  pageSize: 20,
};

const defaultContextValue: DataAppContextType = {
  state: initialState,
  updateSearchTerm: () => {},
  updateErrorThrow: () => {},
  updateShowModal: () => {},
  updateCharactesList: () => {},
  updateLoading: () => {},
  updateErrorMessage: () => {},
};

export const DataAppContext =
  createContext<DataAppContextType>(defaultContextValue);

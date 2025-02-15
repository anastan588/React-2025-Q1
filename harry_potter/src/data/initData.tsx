import { State } from '../types/types';

export const initialState: State = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  charactersList: [],
  loading: true,
  error: {
    message: '',
    stack: '',
  },
  showErrorModal: false,
  errorThrow: false,
  detailesOpened: false,
  pageNumber: 1,
  pageSize: 30,
  records: 0,
};

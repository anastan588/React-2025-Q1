import { State } from '../types/types';

export const initialState: State = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  charactersList: [],
  selectedCharacters: [],
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
  detailedId: '',
  detailedCard: undefined,
};

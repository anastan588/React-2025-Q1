import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character, ErrorDetails, State } from '$/types';

const initialState: State = {
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
};

export const potterSlice = createSlice({
  name: 'harry_potter',
  initialState,
  reducers: {
    updateSerchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateCharactersList: (state, action: PayloadAction<Character[]>) => {
      state.charactersList = action.payload;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateErrorMessage: (state, action: PayloadAction<ErrorDetails>) => {
      state.error = action.payload;
    },
    updateShowErrorMessageWindow: (state, action: PayloadAction<boolean>) => {
      state.showErrorModal = action.payload;
    },
    updateErrorThrow: (state, action: PayloadAction<boolean>) => {
      state.errorThrow = action.payload;
    },
    updateIsDetailedOpened: (state, action: PayloadAction<boolean>) => {
      state.detailesOpened = action.payload;
    },
    updatePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    updatePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    updateNumberAllCharacters: (state, action: PayloadAction<number>) => {
      state.records = action.payload;
    },
  },
});

export const {
  updateSerchTerm,
  updateCharactersList,
  updateLoading,
  updateErrorMessage,
  updateShowErrorMessageWindow,
  updateErrorThrow,
  updateIsDetailedOpened,
  updatePageNumber,
  updatePageSize,
  updateNumberAllCharacters,
} = potterSlice.actions;

export default potterSlice.reducer;

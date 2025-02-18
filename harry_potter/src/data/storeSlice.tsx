import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { potterApi } from '../api/apiRequest';
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
  detailedId: '',
  detailedCard: undefined,
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
    addSelectedCharacters: (state, action: PayloadAction<Character>) => {
      const isSelected = state.selectedCharacters.some(
        (character) => character.id === action.payload.id
      );
      if (!isSelected) {
        state.selectedCharacters = [
          ...state.selectedCharacters,
          action.payload,
        ];
      }
    },
    removeSelectedChacters: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (selectedCharacters) => selectedCharacters.id !== action.payload.id
      );
    },
    cleanSelectedState: (state) => {
      state.selectedCharacters = [];
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
    updateDetailedId: (state, action: PayloadAction<string>) => {
      state.detailedId = action.payload;
    },
    updateDetailedCard: (state, action: PayloadAction<Character>) => {
      state.detailedCard = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addMatcher(potterApi.endpoints.getCharacters.matchPending, () => {})
      .addMatcher(
        potterApi.endpoints.getCharacters.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.charactersList = action.payload.data;
          state.records = action.payload.meta.pagination.records;
        }
      )
      .addMatcher(
        potterApi.endpoints.getCharacters.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = { message: action.error.message as string, stack: '' };
        }
      );
    builder
      .addMatcher(potterApi.endpoints.getCharacterById.matchPending, () => {})
      .addMatcher(
        potterApi.endpoints.getCharacterById.matchFulfilled,
        (state, action) => {
          state.detailedCard = action.payload.data;
        }
      )
      .addMatcher(
        potterApi.endpoints.getCharacterById.matchRejected,
        (state, action) => {
          state.error = { message: action.error.message as string, stack: '' };
        }
      );
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
  updateDetailedCard,
  updateDetailedId,
  removeSelectedChacters,
  addSelectedCharacters,
  cleanSelectedState,
} = potterSlice.actions;

export default potterSlice.reducer;

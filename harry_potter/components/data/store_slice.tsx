import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Character, ErrorDetails, potterApi, State } from '$/components';

export const initialState: State = {
  searchTerm: '',
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
  detailedCard: null,
  detailesOpened: false,
  pageNumber: 1,
  pageSize: 30,
  records: 0,
};

type RootState = {
  potterData: State;
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
    builder.addCase(
      HYDRATE,
      (state, action: { payload: RootState; type: typeof HYDRATE }) => {
        return {
          ...state,
          charactersList: action.payload.potterData.charactersList,
          detailedCard: action.payload.potterData.detailedCard,
          detailesOpened: action.payload.potterData.detailesOpened,
          pageNumber: action.payload.potterData.pageNumber,
          pageSize: action.payload.potterData.pageSize,
          records: action.payload.potterData.records,
          searchTerm: action.payload.potterData.searchTerm,
          loading: action.payload.potterData.loading,
          error: action.payload.potterData.error,
          showErrorModal: action.payload.potterData.showErrorModal,
        };
      }
    );
    builder
      .addMatcher(potterApi.endpoints.getCharacters.matchPending, (state) => {
        if (state.pageNumber === 1) {
          state.loading = true;
        }
      })
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
          state.showErrorModal = true;
          state.error = { message: action.error.message as string, stack: '' };
        }
      );
    builder
      .addMatcher(potterApi.endpoints.getCharacterById.matchPending, () => {})
      .addMatcher(
        potterApi.endpoints.getCharacterById.matchFulfilled,
        (state, action) => {
          state.detailedCard = action.payload.data;
          state.loading = false;
          state.detailesOpened = true;
        }
      )
      .addMatcher(
        potterApi.endpoints.getCharacterById.matchRejected,
        (state, action) => {
          state.showErrorModal = true;
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

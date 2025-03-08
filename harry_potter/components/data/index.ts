export { wrapper, makeStore } from './store';
export type { RootState } from './store';
export type { AppDispatch } from './store';
import PotterReducer from './store_slice';
export { PotterReducer };
export {
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
} from './store_slice';
export { potterSlice } from './store_slice';

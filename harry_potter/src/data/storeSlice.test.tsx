import { describe, expect, test } from 'vitest';

import { potterApi } from '../api/apiRequest';
import { store } from '$/data';
import { Character, ErrorDetails } from '$/types';

import {
  addSelectedCharacters,
  cleanSelectedState,
  removeSelectedChacters,
  updateCharactersList,
  updateDetailedCard,
  updateDetailedId,
  updateErrorMessage,
  updateErrorThrow,
  updateIsDetailedOpened,
  updateLoading,
  updateNumberAllCharacters,
  updatePageNumber,
  updatePageSize,
  updateSerchTerm,
  updateShowErrorMessageWindow,
} from './storeSlice';

describe('potterSlice Reducers', () => {
  test('should update search term', () => {
    store.dispatch(updateSerchTerm('Harry'));
    const state = store.getState().potterData;
    expect(state.searchTerm).toBe('Harry');
  });

  test('should update characters list', () => {
    const characters: Character[] = [
      { id: '1', attributes: { name: 'Harry Potter', house: 'Gryffindor' } },
    ];
    store.dispatch(updateCharactersList(characters));
    const state = store.getState().potterData;
    expect(state.charactersList).toEqual(characters);
  });

  test('should add a selected character', () => {
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(addSelectedCharacters(character));
    const state = store.getState().potterData;
    expect(state.selectedCharacters).toContainEqual(character);
  });

  test('should remove a selected character', () => {
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(addSelectedCharacters(character));
    store.dispatch(removeSelectedChacters(character));
    const state = store.getState().potterData;
    expect(state.selectedCharacters).not.toContainEqual(character);
  });

  test('should clean selected characters', () => {
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(addSelectedCharacters(character));
    store.dispatch(cleanSelectedState());
    const state = store.getState().potterData;
    expect(state.selectedCharacters).toEqual([]);
  });

  test('should update loading state', () => {
    store.dispatch(updateLoading(false));
    const state = store.getState().potterData;
    expect(state.loading).toBe(false);
  });

  test('should update error message', () => {
    const error: ErrorDetails = { message: 'Error occurred', stack: '' };
    store.dispatch(updateErrorMessage(error));
    const state = store.getState().potterData;
    expect(state.error).toEqual(error);
  });

  test('should update show error modal', () => {
    store.dispatch(updateShowErrorMessageWindow(true));
    const state = store.getState().potterData;
    expect(state.showErrorModal).toBe(true);
  });

  test('should update error throw', () => {
    store.dispatch(updateErrorThrow(true));
    const state = store.getState().potterData;
    expect(state.errorThrow).toBe(true);
  });

  test('should update detailed ID', () => {
    store.dispatch(updateDetailedId('123'));
    const state = store.getState().potterData;
    expect(state.detailedId).toBe('123');
  });

  test('should update detailed card', () => {
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(updateDetailedCard(character));
    const state = store.getState().potterData;
    expect(state.detailedCard).toEqual(character);
  });

  test('should update is detailed opened', () => {
    store.dispatch(updateIsDetailedOpened(true));
    const state = store.getState().potterData;
    expect(state.detailesOpened).toBe(true);
  });

  test('should update page number', () => {
    store.dispatch(updatePageNumber(2));
    const state = store.getState().potterData;
    expect(state.pageNumber).toBe(2);
  });

  test('should update page size', () => {
    store.dispatch(updatePageSize(50));
    const state = store.getState().potterData;
    expect(state.pageSize).toBe(50);
  });

  test('should update number of all characters', () => {
    store.dispatch(updateNumberAllCharacters(100));
    const state = store.getState().potterData;
    expect(state.records).toBe(100);
  });

  describe('potterSlice ExtraReducers', () => {
    test('should handle getCharacters.pending', () => {
      console.log(store.getState().potterData.pageNumber);
      console.log(store.getState().potterData);
      store.dispatch(updatePageNumber(1));
      store.dispatch(
        potterApi.endpoints.getCharacters.initiate({
          searchTerm: store.getState().potterData.searchTerm,
          pageNumber: store.getState().potterData.pageNumber,
          pageSize: store.getState().potterData.pageSize,
        })
      );

      const state = store.getState().potterData;
      expect(state.loading).toBe(true);
    });
  });
});

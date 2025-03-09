import { describe, expect, test } from 'vitest';

import {
  addSelectedCharacters,
  Character,
  cleanSelectedState,
  ErrorDetails,
  makeStore,
  potterApi,
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
} from '$/components';

describe('potterSlice Reducers', () => {
  test('should update search term', () => {
    const store = makeStore();
    store.dispatch(updateSerchTerm('Harry'));
    const state = store.getState().potterData;
    expect(state.searchTerm).toBe('Harry');
  });

  test('should update characters list', () => {
    const store = makeStore();
    const characters: Character[] = [
      { id: '1', attributes: { name: 'Harry Potter', house: 'Gryffindor' } },
    ];
    store.dispatch(updateCharactersList(characters));
    const state = store.getState().potterData;
    expect(state.charactersList).toEqual(characters);
  });

  test('should add a selected character', () => {
    const store = makeStore();
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(addSelectedCharacters(character));
    const state = store.getState().potterData;
    expect(state.selectedCharacters).toContainEqual(character);
  });

  test('should remove a selected character', () => {
    const store = makeStore();
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
    const store = makeStore();
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
    const store = makeStore();
    store.dispatch(updateLoading(false));
    const state = store.getState().potterData;
    expect(state.loading).toBe(false);
  });

  test('should update error message', () => {
    const store = makeStore();
    const error: ErrorDetails = { message: 'Error occurred', stack: '' };
    store.dispatch(updateErrorMessage(error));
    const state = store.getState().potterData;
    expect(state.error).toEqual(error);
  });

  test('should update show error modal', () => {
    const store = makeStore();
    store.dispatch(updateShowErrorMessageWindow(true));
    const state = store.getState().potterData;
    expect(state.showErrorModal).toBe(true);
  });

  test('should update error throw', () => {
    const store = makeStore();
    store.dispatch(updateErrorThrow(true));
    const state = store.getState().potterData;
    expect(state.errorThrow).toBe(true);
  });

  test('should update detailed ID', () => {
    const store = makeStore();
    store.dispatch(updateDetailedId('123'));
    const state = store.getState().potterData;
    expect(state.detailedId).toBe('123');
  });

  test('should update detailed card', () => {
    const store = makeStore();
    const character: Character = {
      id: '1',
      attributes: { name: 'Harry Potter', house: 'Gryffindor' },
    };
    store.dispatch(updateDetailedCard(character));
    const state = store.getState().potterData;
    expect(state.detailedCard).toEqual(character);
  });

  test('should update is detailed opened', () => {
    const store = makeStore();
    store.dispatch(updateIsDetailedOpened(true));
    const state = store.getState().potterData;
    expect(state.detailesOpened).toBe(true);
  });

  test('should update page number', () => {
    const store = makeStore();
    store.dispatch(updatePageNumber(2));
    const state = store.getState().potterData;
    expect(state.pageNumber).toBe(2);
  });

  test('should update page size', () => {
    const store = makeStore();
    store.dispatch(updatePageSize(50));
    const state = store.getState().potterData;
    expect(state.pageSize).toBe(50);
  });

  test('should update number of all characters', () => {
    const store = makeStore();
    store.dispatch(updateNumberAllCharacters(100));
    const state = store.getState().potterData;
    expect(state.records).toBe(100);
  });

  describe('potterSlice ExtraReducers', () => {
    const store = makeStore();
    test('should handle getCharacters.pending', () => {
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

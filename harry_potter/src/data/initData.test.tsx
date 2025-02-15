import { describe, expect, it } from 'vitest';

import { State } from '$/types/types';
import { initialState } from '$/data';

describe('initialState', () => {
  it('should have the correct initial values', () => {
    const expectedState: State = {
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
    expect(initialState).toEqual(expectedState);
  });
});

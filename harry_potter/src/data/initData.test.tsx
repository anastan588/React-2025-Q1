import { describe, expect, it } from 'vitest';

import { initialState } from '$/data';
import { State } from '$/types/types';

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

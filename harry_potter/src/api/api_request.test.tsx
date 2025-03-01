import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it, test, vi } from 'vitest';

import { potterApi } from '$/api';
import { PotterReducer } from '$/data';

const setupApiStore = () => {
  return configureStore({
    reducer: {
      potterData: PotterReducer,
      [potterApi.reducerPath]: potterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(potterApi.middleware),
  });
};
const mockFetch = vi.fn();

global.fetch = mockFetch;

describe('potterApi', () => {
  const store = setupApiStore();

  test('should construct the correct query for getCharacters', async () => {
    const params = { searchTerm: 'Harry', pageNumber: 1, pageSize: 10 };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [] }),
    });

    const result = await store.dispatch(
      potterApi.endpoints.getCharacters.initiate(params)
    );
    expect(result.originalArgs).toEqual(params);
  });

  it('should construct the correct query for getCharacterById', async () => {
    const detailedId = '1';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await store.dispatch(
      potterApi.endpoints.getCharacterById.initiate(detailedId)
    );
    expect(result.originalArgs).toEqual(detailedId);
  });
});

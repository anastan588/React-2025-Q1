import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from 'vitest';

import { potterApi, PotterReducer } from '$/components';

describe('Redux Store Configuration', () => {
  test('should configure the store with potterReducer and potterApi', () => {
    const store = configureStore({
      reducer: {
        potterData: PotterReducer,
        [potterApi.reducerPath]: potterApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(potterApi.middleware),
    });
    const state = store.getState();
    expect(state).toHaveProperty('potterData');
    expect(state).toHaveProperty(potterApi.reducerPath);

    const middleware = store.dispatch.toString();
    expect(middleware).toContain('action');
  });
});

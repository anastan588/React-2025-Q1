import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, test } from 'vitest';

import { potterApi } from '$/api';

import potterReducer from './storeSlice';

describe('Redux Store Configuration', () => {
  test('should configure the store with potterReducer and potterApi', () => {
    const store = configureStore({
      reducer: {
        potterData: potterReducer,
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

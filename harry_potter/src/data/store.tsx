import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { potterApi } from '$/api';

import potterReducer from './store_slice';

export const store = configureStore({
  reducer: {
    potterData: potterReducer,
    [potterApi.reducerPath]: potterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(potterApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

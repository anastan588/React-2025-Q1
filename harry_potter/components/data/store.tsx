import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { potterApi, PotterReducer } from '$/components';

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      potterData: PotterReducer,
      [potterApi.reducerPath]: potterApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(potterApi.middleware),
  });

  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

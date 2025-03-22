import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { formControlledSlice } from './controll_slice';
import { formUncontrolledSlice } from './uncontroll_slice';

export const store = configureStore({
  reducer: {
    uncontrolled_form: formUncontrolledSlice.reducer,
    controlled_form: formControlledSlice.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormState } from '$/types/types';

const initialControlledState: FormState = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  terms: false,
  picture: '',
  country: ['Russia', 'Belarus', 'China'],
  countrySelect: '',
  isFormContFilled: false,
  isFormUncontFilled: false,
};

export const formControlledSlice = createSlice({
  name: 'controlled_form',
  initialState: initialControlledState,
  reducers: {
    updateControlledForm: (state, action: PayloadAction<FormState>) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { updateControlledForm } = formControlledSlice.actions;

export default formControlledSlice.reducer;

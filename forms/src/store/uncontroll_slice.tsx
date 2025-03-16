import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormState } from '$/types';

const initialUncontrolledState: FormState = {
  name: '',
  age: 0,
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

export const formUncontrolledSlice = createSlice({
  name: 'uncontrolled_form',
  initialState: initialUncontrolledState,
  reducers: {
    updateUncontrolledForm: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUncontrolledForm } = formUncontrolledSlice.actions;

export default formUncontrolledSlice.reducer;

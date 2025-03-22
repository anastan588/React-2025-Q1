import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ControlledFormState } from '$/types';

const initialControlledState: ControlledFormState = {
  terms: false,
  gender: 'male',
  country: ['Russia', 'Belarus', 'China'],
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  picture: '',
  countrySelect: '',
  isFormContFilled: false,
  isFormUncontFilled: false,
};
export const formControlledSlice = createSlice({
  name: 'controlled_form',
  initialState: initialControlledState,
  reducers: {
    updateControlledForm: (
      state,
      action: PayloadAction<ControlledFormState>
    ) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { updateControlledForm } = formControlledSlice.actions;

export default formControlledSlice.reducer;

import * as Yup from 'yup';

export const dataSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(/^[A-Z]/, 'First character must be uppercase')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot be longer than 50 characters')
    .required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .integer('Age must be a whole number')
    .min(0, 'Age cannot be negative')
    .max(120, 'Age seems unrealistic')
    .required('Age is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .max(100, 'Email cannot be longer than 100 characters')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password cannot be longer than 50 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  gender: Yup.string().oneOf(['male', 'female']).required('Gender is required'),
  terms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
  picture: Yup.string()
    .required('Image is required')
    .test('file-size', 'Maximum size: 5MB', (value) => {
      if (!value) return true;
      const sizeInBytes =
        3 * (value.length / 4) - (value.endsWith('==') ? 2 : 1);
      return sizeInBytes <= 5 * 1024 * 1024;
    })
    .test('file-format', 'Allowed formats: JPEG, PNG', (value) => {
      if (!value) return true;
      return (
        value.startsWith('data:image/jpeg') ||
        value.startsWith('data:image/png')
      );
    })
    .required('Profile picture is required'),
  country: Yup.array().of(Yup.string()).required('Country is required'),
  countrySelect: Yup.string().required('Country selection is required'),
});

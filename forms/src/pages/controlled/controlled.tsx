import { ChangeEvent, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  Button,
  CheckboxInput,
  FileInput,
  handlePictureUpload,
  Header,
  SelectInput,
  TextInput,
} from '$/components';
import { dataSchema, updateControlledForm } from '$/store';

function ControlledPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm({
    resolver: yupResolver(dataSchema),
    mode: 'onChange',
    defaultValues: {
      gender: 'male',
      terms: false,
      country: ['Russia', 'Belarus', 'China'],
    },
  });

  const options = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];
  const onSubmit: SubmitHandler<{
    terms?: boolean;
    gender: NonNullable<'male' | 'female'>;
    country: (string | undefined)[];
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    picture: string;
    countrySelect: string;
  }> = async (data) => {
    const updatedData = {
      ...data,
      isFormContFilled: true,
    };
    dispatch(updateControlledForm(updatedData));
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileData = await handlePictureUpload(event);
    setValue('picture', fileData as string);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      navigate('/');
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="bg-primary flex h-full min-h-screen flex-col items-center bg-contain bg-center">
      <Header title_text={'Controlled form'} />
      <div className="text-text-secondary p-4">
        <form
          className="bg-light-grey flex flex-col gap-2 rounded-lg border-2 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <TextInput
            label="Age"
            {...register('age')}
            error={errors.age?.message}
          />
          <TextInput
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <TextInput
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <TextInput
            label="Repeat password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <fieldset className="grid gap-2">
            <legend>Gender:</legend>
            <div className="flex gap-2">
              {options.map((option) => (
                <div key={option.value} className="flex gap-2">
                  <input
                    type="radio"
                    id={option.value}
                    value={option.value}
                    {...register('gender')}
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
            {errors.gender && (
              <div className="text-red-500">{errors.gender.message}</div>
            )}
          </fieldset>
          <CheckboxInput
            label="Terms and Conditions agreement"
            checked={watch('terms')}
            {...register('terms')}
            error={errors.terms?.message}
          />
          <FileInput
            {...register('picture')}
            label="Upload picture"
            onChange={handleFile}
            picture={watch('picture')}
            error={errors.picture?.message}
          />
          <SelectInput
            label="Choose a country"
            options={['Russia', 'Belarus', 'China']}
            {...register('countrySelect')}
            error={errors.countrySelect?.message}
          />
          <Button type="submit" disabled={!isValid}>
            {!isValid ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ControlledPage;

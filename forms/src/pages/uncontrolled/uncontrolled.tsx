import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

import Button from '$/components/button/button';
import { handlePictureUpload } from '$/components/file_upload/file_upload';
import { Header } from '$/components/header/header';
import { CheckboxInput } from '$/components/inputs/check_box_input';
import { FileInput } from '$/components/inputs/file_input';
import { RadioInput } from '$/components/inputs/radio_input';
import { SelectInput } from '$/components/inputs/select_input';
import { TextInput } from '$/components/inputs/text_input';
import { dataSchema } from '$/store/dataShema';
import { updateUncontrolledForm } from '$/store/uncontroll_slice';

function UnControlledPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(formData);
    const { name, type, value } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    console.log(value, 'value');
    console.log(checked, 'checked');
    console.log(type);
    console.log(type === 'checkbox');
    console.log(name);
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    console.log(formData);
  };

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileData = await handlePictureUpload(event);
    if (fileData) {
      setFormData((prev) => ({
        ...prev,
        picture: fileData,
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dataSchema.validate(formData, { abortEarly: false }).then(() => {
        setFormData((prev) => ({
          ...prev,
          isFormUncontFilled: true,
        }));
        setErrors({});
        console.log(formData);
      });
    } catch (err) {
      const newErrors: { [key: string]: string } = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (formData.isFormUncontFilled) {
      dispatch(updateUncontrolledForm(formData));
      navigate('/');
    }
  }, [formData.isFormUncontFilled]);

  return (
    <div className="bg-primary flex h-full min-h-screen flex-col items-center bg-contain bg-center">
      <Header title_text={'Uncontrolled form'} />
      <div className="text-text-secondary p-4">
        <form
          className="bg-light-grey flex flex-col gap-2 rounded-lg border-2 p-4"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextInput
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <TextInput
            label="Repeat password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <RadioInput
            label="Gender"
            name="gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            selectedValue={formData.gender}
            onChange={handleChange}
            error={errors.gender}
          />
          <CheckboxInput
            label="Terms and Conditions agreement"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            error={errors.terms}
          />
          <FileInput
            label="Upload picture"
            onChange={handleFile}
            picture={formData.picture}
            error={errors.picture}
          />
          <SelectInput
            label="Choose a country"
            name="countrySelect"
            options={formData.country}
            value={formData.countrySelect}
            onChange={handleChange}
            error={errors.countrySelect}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default UnControlledPage;

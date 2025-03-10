import * as yup from 'yup';

export const userValidateSchema = yup.object({
  user_type: yup.string().required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

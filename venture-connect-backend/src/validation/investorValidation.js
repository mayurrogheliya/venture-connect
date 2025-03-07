import * as yup from 'yup';

export const investorValidationSchema = yup.object({
  user_type: yup.string().required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),

  investorBasicInfo: yup
    .object({
      name: yup.string().required('Investor name is required'),
      location: yup.string().required('Location is required'),
      investor_type: yup.string().required('Investor type is required'),
      phone: yup.string().required('Phone number is required'),
      webkitURL: yup.string().url('Invalid website url'),
      linkedin_url: yup
        .string()
        .url('Invalid LinkedIn URL')
        .required('LinkedIn URL is required'),
      experience: yup.string().required('Investor experience is required'),
      preffered_stage: yup.string().required('Preferred stage is required'),
    })
    .required(),
});

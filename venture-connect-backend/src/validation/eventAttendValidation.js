import * as yup from 'yup';

const eventAttendValidationSchema = yup.object({
  eventId: yup.string().uuid().required('Event ID is required'),
  firstname: yup.string().min(2).max(50).required('First name is required'),
  lastname: yup.string().min(2).max(50).required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phonenumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .nullable(),
  companyname: yup.string().max(100).nullable(),
  jobtitle: yup.string().max(100).nullable(),
});

export default eventAttendValidationSchema;

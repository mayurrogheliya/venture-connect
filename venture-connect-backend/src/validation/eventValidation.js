import * as yup from 'yup';

const eventValidationSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  subtitle: yup.string().required('Subtitle is required'),
  city: yup.string().required('City is required'),
  address: yup.string().required('Address is required'),
  capacity: yup
    .number()
    .typeError('Capacity must be a number')
    .min(1, 'Capacity must be at least 1')
    .required('Capacity is required'),
  description: yup.string().required('Description is required'),
  keyhighlights: yup.string().required('Key highlights are required'),
  whoShouldAttend: yup.string().required('Who should attend is required'),
  date: yup
    .date()
    .required('Event date is required')
    .min(new Date(), 'Event date must be in the future'),
  timeFrom: yup
    .string()
    .required('Start time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  timeTill: yup
    .string()
    .required('End time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  event_url: yup
    .string()
    .required('Event URL is required')
    .url('Invalid URL format'),
});

export default eventValidationSchema;

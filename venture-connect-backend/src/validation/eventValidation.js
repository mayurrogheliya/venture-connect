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
  keyhighlights: yup
    .array()
    .of(
      yup
        .string()
        .trim()
        .min(1, 'Each highlight must be at least 1 character long'),
    )
    .min(1, 'At least one key highlight is required')
    .required('Key highlights are required'),

  whoShouldAttend: yup
    .array()
    .of(
      yup
        .string()
        .trim()
        .min(1, 'Each attendee type must be at least 1 character long'),
    )
    .min(1, 'At least one attendee type is required')
    .required('Who should attend is required'),
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

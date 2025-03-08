import * as yup from 'yup';
const opportunityValidationSchema = yup.object().shape({
  name: yup.string().required('Opportunity name is required'),
  domain: yup.string().required('Domain is required'),
  mininvestment: yup.number().required('Minimum investment is required'),
  maxinvestment: yup.number().required('Maximum investment is required'),
  startupstage: yup.string().required('Startup stage is required'),
  description: yup.string().required('Description is required'),
});
export default opportunityValidationSchema;

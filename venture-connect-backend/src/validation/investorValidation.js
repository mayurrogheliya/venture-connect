import * as yup from 'yup';

export const investorValidationSchema = yup.object({
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

  investmentDetails: yup
    .object({
      investmentRange: yup.string().required('Investment range is required'),
      companyPortfolio: yup
        .number()
        .integer()
        .min(0, 'Portfolio company cannot be negative')
        .required('Portfolio company is required'),
      totalInvestment: yup
        .number()
        .integer()
        .min(0, 'Total investments cannot be negative')
        .required('Total investments are required'),
      interestedDomain: yup
        .array()
        .of(yup.string())
        .min(1, 'At least one interested domain is required')
        .required('Interested domains are required'),
      mentorship: yup.boolean().required('Mentorship preference is required'),
    })
    .required(),

  previousInvestments: yup
    .array()
    .of(
      yup.object({
        startupName: yup.string().required('Startup name is required'),
        domain: yup.string().required('Domain name is required'),
        description: yup.string().required('Description is required'),
        year: yup.number().required('Year is required'),
      }),
    )
    .max(
      6,
      'Cannot add more than 6 previous investments. Please remove some before adding new ones.',
    ),
});

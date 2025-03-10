import * as yup from 'yup';

export const startupValidationSchema = yup.object({
  basicInfo: yup
    .object({
      startup_name: yup.string().required('Startup name is required'),
      location: yup.string().required('Location is required'),
      website: yup
        .string()
        .url('Invalid website URL')
        .required('Website is required'),
      stage: yup.string().required('Startup stage is required'),
      industry: yup.string().required('Industry is required'),
      team_size: yup.number().positive().required('Team size is required'),
      linkedin_url: yup.string().url('Invalid LinkedIn URL'),
      twitter_url: yup.string().url('Invalid Twitter URL'),
      company_overview: yup.string().required('Company overview is required'),
      key_highlights: yup.string().required('Key highlights are required'),
    })
    .required(),

  metrics: yup
    .object({
      mrr: yup.number().positive().required('MRR is required'),
      yoy: yup.number().positive().required('YOY is required'),
      total_funding: yup
        .number()
        .positive()
        .required('Total funding is required'),
      current_valuation: yup
        .number()
        .positive()
        .required('Current valuation is required'),
      investment_amount: yup
        .number()
        .positive()
        .required('Investment amount is required'),
      equity_offered: yup.number().required('Equity offered is required'),
      cac: yup.number().positive().required('CAC is required'),
      ltv: yup.number().positive().required('LTV is required'),
      monthly_burn_rate: yup
        .number()
        .positive()
        .required('Monthly burn rate is required'),
    })
    .required(),

  team: yup
    .object({
      founder_name: yup.string().required('Founder name is required'),
      linkedin_profile: yup
        .string()
        .url('Invalid LinkedIn URL')
        .required('Founder LinkedIn profile is required'),
      overview: yup.string().required('Founder Overview is required'),
    })
    .required(),

  teamMembers: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required('Team member name is required'),
        position: yup.string().required('Team member position is required'),
        bio: yup.string().required('Team member bio is required'),
      }),
    )
    .min(1, 'At least one team member is required'),
});

export const startupUpdateValidationSchema =
  startupValidationSchema.noUnknown();

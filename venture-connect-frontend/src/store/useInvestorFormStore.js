// store/useInvestorFormStore.js
import { create } from 'zustand';

export const useInvestorFormStore = create((set) => ({
  // ============== Basic Info ==============
  basicInfo: {
    fullName: '',
    linkedin: '',
    location: '',
    website: '',
    investorType: 'Angel Investor', // Default value
    twitter: '',
    email: '',
    experience: '5', // Default value
    phone: '',
    startupStage: 'Seed' // Default value
  },
  profileImage: null,
  imageError: '',

  // ============== Investment Details ==============
  investmentDetails: {
    investmentRange: [100000, 2000000], // $100K - $2M
    portfolioCompanies: 5,
    totalInvestment: 2000000,
    interestedDomains: ['AgriTech', 'IT', 'Business', 'Clothes'],
    mentorship: true
  },

  // ============== Previous Investments ==============
  previousInvestments: [{
    startupName: 'Tech Innovations',
    domain: 'AI',
    description: 'Invested in AI-driven platform',
    year: 2021
  }],

  // ============== Methods ==============
  // Basic Info Actions
  setBasicInfoField: (field, value) => set((state) => ({
    basicInfo: { ...state.basicInfo, [field]: value }
  })),
  setProfileImage: (imageFile) => set({ profileImage: imageFile, imageError: '' }),
  setImageError: (error) => set({ imageError: error }),

  // Investment Details Actions
  setInvestmentRange: (range) => set((state) => ({
    investmentDetails: { ...state.investmentDetails, investmentRange: range }
  })),
  setInvestmentField: (field, value) => set((state) => ({
    investmentDetails: { ...state.investmentDetails, [field]: value }
  })),

  // Previous Investments Actions
  addInvestment: (investment) => set((state) => ({
    previousInvestments: [...state.previousInvestments, investment]
  })),
  updateInvestment: (index, field, value) => set((state) => {
    const updated = [...state.previousInvestments];
    updated[index] = { ...updated[index], [field]: value };
    return { previousInvestments: updated };
  }),
  removeInvestment: (index) => set((state) => ({
    previousInvestments: state.previousInvestments.filter((_, i) => i !== index)
  })),

  // Form Management
  validateBasicInfo: () => {
    const state = useInvestorFormStore.getState();
    if (!state.profileImage) {
      set({ imageError: 'Profile image is required' });
      return false;
    }
    return true;
  },

  validateInvestmentDetails: () => {
    const state = useInvestorFormStore.getState();
    const { investmentDetails } = state;
    
    // Validate required fields
    if (!investmentDetails.investmentRange || 
        investmentDetails.investmentRange.length !== 2 ||
        !investmentDetails.portfolioCompanies ||
        !investmentDetails.totalInvestment ||
        !investmentDetails.interestedDomains ||
        investmentDetails.interestedDomains.length === 0) {
      return false;
    }

    // Validate investment range
    const [min, max] = investmentDetails.investmentRange;
    if (min < 0 || max < min) {
      return false;
    }

    // Validate portfolio companies
    if (isNaN(investmentDetails.portfolioCompanies) || 
        investmentDetails.portfolioCompanies < 0) {
      return false;
    }

    // Validate total investment
    if (isNaN(investmentDetails.totalInvestment) || 
        investmentDetails.totalInvestment < 0) {
      return false;
    }

    return true;
  },

  resetForm: () => set({
    basicInfo: {
      fullName: '',
      linkedin: '',
      location: '',
      website: '',
      investorType: 'Angel Investor',
      twitter: '',
      email: '',
      experience: '5',
      phone: '',
      startupStage: 'Seed'
    },
    profileImage: null,
    imageError: '',
    investmentDetails: {
      investmentRange: [100000, 2000000],
      portfolioCompanies: 5,
      totalInvestment: 2000000,
      interestedDomains: ['AgriTech', 'IT', 'Business', 'Clothes'],
      mentorship: true
    },
    previousInvestments: [{
      startupName: 'Tech Innovations',
      domain: 'AI',
      description: 'Invested in AI-driven platform',
      year: 2021
    }]
  })
}));
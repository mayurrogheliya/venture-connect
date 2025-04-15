import { useState } from "react";
import BasicInfoForm from "./BasicInfo";
import InvestmentDetailsForm from "./InvestInfo";
import { Button, Progress, message } from "antd";
import { useInvestorFormStore } from '../../../store/useInvestorFormStore';
import { investoAPI } from '../../../api/endpoints/investor';
import { useNavigate } from 'react-router-dom';

const InvestorProfileForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Use the Zustand store directly
  const { 
    basicInfo, 
    investmentDetails, 
    previousInvestments, 
    profileImage, 
    resetForm,
    validateBasicInfo,
    validateInvestmentDetails
  } = useInvestorFormStore();

  const handleNext = async () => {
    try {
      // Validate using the store's validation method
      const isValid = validateBasicInfo();
      if (isValid) {
        setStep(2);
      } else {
        message.error('Please fill all required fields correctly');
      }
    } catch (err) {
      console.error('Validation error:', err);
      message.error('Please fill all required fields correctly');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log('mainForm - Starting form submission');
      
      // Validate basic info
      const isBasicInfoValid = validateBasicInfo();
      if (!isBasicInfoValid) {
        console.log('mainForm - Basic info validation failed');
        message.error('Please correct the errors in the basic info form');
        setLoading(false);
        return;
      }
      
      // Validate investment details
      const isInvestmentValid = validateInvestmentDetails();
      if (!isInvestmentValid) {
        console.log('mainForm - Investment details validation failed');
        message.error('Please correct the errors in the investment details form');
        setLoading(false);
        return;
      }
      
      const formData = new FormData();
      
      // Add profile image first
      if (profileImage) {
        console.log('mainForm - Adding profile image to form data');
        formData.append('investor_image', profileImage);
      } else {
        message.error('Profile image is required');
        setLoading(false);
        return;
      }
  
      // Prepare data in exact API format
      const apiData = {
        investorBasicInfo: {
          name: basicInfo.fullName,
          location: basicInfo.location,
          investor_type: basicInfo.investorType,
          phone: basicInfo.phone,
          linkedin_url: basicInfo.linkedin,
          experience: basicInfo.experience,
          preffered_stage: basicInfo.startupStage,
          twitter: basicInfo.twitter,
          website: basicInfo.website
        },
        investmentDetails: {
          investmentRange: `$${investmentDetails.investmentRange[0]/1000}K - $${investmentDetails.investmentRange[1]/1000000}M`,
          companyPortfolio: investmentDetails.portfolioCompanies,
          totalInvestment: investmentDetails.totalInvestment,
          interestedDomain: investmentDetails.interestedDomains,
          mentorship: investmentDetails.mentorship
        },
        previousInvestments: previousInvestments,
        userId: localStorage.getItem('userId')
      };
  
      console.log('mainForm - Prepared API data:', apiData);
      
      // Add the entire objects as JSON strings
      formData.append('investorBasicInfo', JSON.stringify(apiData.investorBasicInfo));
      formData.append('investmentDetails', JSON.stringify(apiData.investmentDetails));
      formData.append('previousInvestments', JSON.stringify(apiData.previousInvestments));
      formData.append('userId', apiData.userId);
      
      console.log('mainForm - Submitting form data to API');
      
      // Log the FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await investoAPI.createInvestorProfile(formData);
      
      if (response.status === 201) {
        message.success('Profile created successfully!');
        resetForm();
        navigate('/startups-hub');
      }
    } catch (error) {
      console.error('mainForm - Submission error:', error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error('Failed to submit form. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-12 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Complete Your <span className="text-blue-500">Investor Profile</span>
      </h1>
      <p className="text-gray-600 mt-2">
        Submit your details to connect with promising startups and investment opportunities.
      </p>

      <div className="mt-4">
        <Progress percent={step === 1 ? 50 : 100} showInfo={false} strokeColor="#2563eb" />
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span className={`font-medium ${step === 1 ? "text-blue-500" : "text-gray-500"}`}>Basic Info</span>
          <span className={`font-medium ${step === 2 ? "text-blue-500" : "text-gray-500"}`}>Investment Details</span>
        </div>
      </div>

      {/* Keep both components mounted but only display the active one */}
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <BasicInfoForm />
      </div>
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <InvestmentDetailsForm />
      </div>

      <div className="flex justify-end mt-6 gap-4">
        {step === 2 && (
          <Button size="large" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button type="primary" size="large" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button 
            type="primary" 
            size="large" 
            onClick={handleSubmit}
            loading={loading}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvestorProfileForm;
import { useState } from "react";
import BasicInfoForm from "./BasicInfo";
import InvestmentDetailsForm from "./InvestInfo";
import { Button, Progress, Alert, message } from "antd";
import { useInvestorFormStore } from '../../../store/useInvestorFormStore';
import { investoAPI } from '../../../api/endpoints/investor';
import { useNavigate } from 'react-router-dom';

const InvestorProfileForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const { 
    basicInfo, 
    investmentDetails, 
    previousInvestments, 
    profileImage, 
    resetForm,
    validateBasicInfo,
    validateInvestmentDetails
  } = useInvestorFormStore();

  const handleNext = () => {
    try {
      const isValid = validateBasicInfo();
      if (isValid) {
        setStep(2);
        setErrorMessage('');
      } else {
        setErrorMessage('Please fill all required fields correctly');
      }
    } catch (err) {
      console.error('Validation error:', err);
      setErrorMessage('Please fill all required fields correctly');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const isBasicInfoValid = validateBasicInfo();
      if (!isBasicInfoValid) {
        setErrorMessage('Please correct the errors in the basic info form');
        setLoading(false);
        return;
      }

      const isInvestmentValid = validateInvestmentDetails();
      if (!isInvestmentValid) {
        setErrorMessage('Please correct the errors in the investment details form');
        setLoading(false);
        return;
      }

      const formData = new FormData();

      if (profileImage) {
        formData.append('investor_image', profileImage);
      } else {
        setErrorMessage('Profile image is required');
        setLoading(false);
        return;
      }

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
          website_url: basicInfo.website
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

      formData.append('investorBasicInfo', JSON.stringify(apiData.investorBasicInfo));
      formData.append('investmentDetails', JSON.stringify(apiData.investmentDetails));
      formData.append('previousInvestments', JSON.stringify(apiData.previousInvestments));
      formData.append('userId', apiData.userId);

      const response = await investoAPI.createInvestorProfile(formData);
      console.log("API Response:", response);

      if (response.status === 200) {
        message.success('Profile created successfully!');
        resetForm();
        setTimeout(() => navigate('/startups-hub'), 2000); // delay for toast
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Failed to submit form. Please try again.');
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

      {errorMessage && (
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
          closable
          onClose={() => setErrorMessage('')}
          className="mb-4"
        />
      )}

      <div className="mt-4">
        <Progress percent={step === 1 ? 50 : 100} showInfo={false} strokeColor="#2563eb" />
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span className={`font-medium ${step === 1 ? "text-blue-500" : "text-gray-500"}`}>Basic Info</span>
          <span className={`font-medium ${step === 2 ? "text-blue-500" : "text-gray-500"}`}>Investment Details</span>
        </div>
      </div>

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

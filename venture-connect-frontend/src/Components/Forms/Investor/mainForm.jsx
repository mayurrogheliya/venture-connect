import { useState, useRef } from "react";
import BasicInfoForm from "./BasicInfo";
import InvestmentDetailsForm from "./InvestInfo";
import { Button, Progress } from "antd";

const InvestorProfileForm = () => {
  const [step, setStep] = useState(1);
  const basicInfoRef = useRef(null);

  const handleNext = async () => {
    if (basicInfoRef.current) {
      const isValid = await basicInfoRef.current.validateForm();
      if (isValid) setStep(2);
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

      {step === 1 && <BasicInfoForm ref={basicInfoRef} />}
      {step === 2 && <InvestmentDetailsForm />}

      <div className="flex justify-end mt-6">
        {step === 1 && (
          <Button type="primary" size="large" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvestorProfileForm;

import { useState } from "react";
import BasicInfoForm from "./BasicInfo";  
import InvestmentDetailsForm from "./InvestInfo";
import { Button,Progress } from "antd";

const InvestorProfileForm = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);


  return (

    <div className="px-12 py-12">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        Complete Your <span className="text-blue-500">Investor Profile</span>
      </h1>
      <p className="text-gray-600 mt-2">
        Submit your details to connect with promising startups and investment opportunities.
      </p>
            {/* Progress Bar */}
      <div className="mt-4">
        <Progress percent={step === 1 ? 50 : 100} showInfo={false} strokeColor="#2563eb" />
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span className={`font-medium ${step === 1 ? "text-blue-500" : "text-gray-500"}`}>
            Basic Info
          </span>
          <span className={`font-medium ${step === 2 ? "text-blue-500" : "text-gray-500"}`}>
            Investment Details
          </span>
        </div>
      </div>


      {/* Render Form Steps */}
      {step === 1 && <BasicInfoForm />}
      {step === 2 && <InvestmentDetailsForm />}

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-6 mr-13">
        {step === 1 && (
          <Button type="primary" size="large" onClick={() => {setStep(2);setProgress(100)} }>
            Next
          </Button>
        )}
        {step === 2 && (
          <>
            <Button type="primary" size="large">Submit</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorProfileForm;

import React from 'react';
import OpportunityForm from '../../Components/Opportunities/OpportunityForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { opportunityAPIs } from '../../api/endpoints/opportunity';

const CreateOpportunity = () => {
  const navigate = useNavigate();

  const handleCreateOpportunity = async (formData) => {
    try {
      const response = await opportunityAPIs.createOpportunity(formData);
      toast.success(response.data.message);
      navigate('/Investor-Opportunity');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <OpportunityForm onSubmit={handleCreateOpportunity} isEdit={false} />
    </div>
  );
};

export default CreateOpportunity;

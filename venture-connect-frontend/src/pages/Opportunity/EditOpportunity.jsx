import React, { useEffect, useState } from 'react';
import OpportunityForm from '../../Components/Opportunities/OpportunityForm';
import { useNavigate, useParams } from 'react-router-dom';
import { opportunityAPIs } from '../../api/endpoints/opportunity';
import { toast } from 'react-toastify';

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  useEffect(() => {
    const fetchOpportunityDetails = async (id) => {
      if (!id) return;

      try {
        const response = await opportunityAPIs.getByOpportunities(id);

        if (response.data && response.data.data) {
          setInitialValues(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching opportunity details:', error);
      }
    };

    fetchOpportunityDetails(id);
  }, [id]);

  const handleEditOpportunies = async (formData) => {
    try {
      const response = await opportunityAPIs.updateOpportunity(id, formData);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate('/Investor-Opportunity');
    } catch (error) {
      // console.error('Update Error:', error);
      toast.error(
        `Update Error: ${error.response?.data?.message || error.message}`,
      );
    }
  };
  return (
    <div>
      <OpportunityForm
        onSubmit={handleEditOpportunies}
        initialData={initialValues}
        isEdit={true}
      />
    </div>
  );
};

export default EditOpportunity;

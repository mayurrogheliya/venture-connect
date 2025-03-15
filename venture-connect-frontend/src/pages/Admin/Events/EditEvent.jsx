import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminEventForm from '../../../components/AdminEvent/AdminEventForm';
import { eventsAPIs } from '../../../api/endpoints/event';
import { toast } from 'react-toastify';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;

      try {
        const response = await eventsAPIs.getEventById(id);
        setInitialValues(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleEditEvent = async (formData) => {
    try {
      const response = await eventsAPIs.updateEvent(id, formData);

      if (response.data.message) {
        toast.success(response.data.message);
      }
      navigate('/admin/events');
    } catch (error) {
      // console.error('Update Error:', error);
      toast.error(
        `Update Error: ${error.response?.data?.message || error.message}`,
      );
    }
  };

  return initialValues ? (
    <AdminEventForm
      initialValues={initialValues}
      onSubmit={handleEditEvent}
      isEdit={true}
    />
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <Spin size="large" />
    </div>
  );
};

export default EditEvent;

import React, { useState } from 'react';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { eventsAPIs } from '../../../api/endpoints/event';
import { toast } from 'react-toastify';
import AdminEventForm from '../../../components/AdminEvent/AdminEventForm';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (formData) => {
    setLoading(true);
    try {
      const response = await eventsAPIs.createEvent(formData);
      toast.success(response.data.message);
      navigate('/admin/events');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to create event',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Creating event..." size="large">
      <AdminEventForm onSubmit={handleCreateEvent} isEdit={false} />
    </Spin>
  );
};

export default CreateEvent;

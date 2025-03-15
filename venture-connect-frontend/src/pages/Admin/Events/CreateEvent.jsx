import React from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { eventsAPIs } from '../../../api/endpoints/event';
import { toast } from 'react-toastify';
import AdminEventForm from '../../../components/AdminEvent/AdminEventForm';
const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (formData) => {
    try {
      const response = await eventsAPIs.createEvent(formData);
      toast.success(response.data.message);
      navigate('/admin/events');
    } catch (error) {
      toast.error(error);
    }
  };

  return <AdminEventForm onSubmit={handleCreateEvent} isEdit={false} />;
};

export default CreateEvent;

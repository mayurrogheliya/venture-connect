import React from 'react';
import { Modal, Form, Input } from 'antd';
import { useEventAttendStore } from '../../../store/useEventAttend';
import { eventsAttentAPIs } from '../../../api/endpoints/eventattendees';
import { toast } from 'react-toastify';

const EventAttendEdit = () => {
  const { edit, closeEditModal, fetchAttends } = useEventAttendStore();
  const [form] = Form.useForm();
  React.useEffect(() => {
    if (edit.open && edit.data) {
      form.setFieldsValue(edit.data);
    }
  }, [edit, form]);

  const onFinish = async (values) => {
    try {
      if (!edit.data.id) {
        toast.error('Attendee ID is missing!');
        return;
      }

      const data = { ...values, eventId: edit.data.eventId };

      const response = await eventsAttentAPIs.updateEventAttend(
        edit.data.id,
        data,
      );

      if (response.data) {
        toast.success(response.data.message);
        fetchAttends(edit.data.eventId);
        closeEditModal();
      }
    } catch (error) {
      console.error('Update failed:', error);
      toast.error(error.response?.data?.message || 'Failed to update attendee');
    }
  };

  return (
    <Modal
      title="Edit Event Attendee"
      open={edit.open}
      onOk={form.submit}
      onCancel={closeEditModal}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[{ required: true, message: 'First Name is required' }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[{ required: true, message: 'Last Name is required' }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: 'email', message: 'Enter valid email' },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>

        <Form.Item
          name="phonenumber"
          label="Phone Number"
          rules={[
            { pattern: /^\d{10}$/, message: 'Phone number must be 10 digits' },
          ]}
        >
          <Input placeholder="Enter Phone Number" />
        </Form.Item>

        <Form.Item name="companyname" label="Company Name">
          <Input placeholder="Enter Company Name" />
        </Form.Item>

        <Form.Item name="jobtitle" label="Job Title">
          <Input placeholder="Enter Job Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EventAttendEdit;

import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Upload,
  message,
  Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AdminEventForm = ({ initialValues, onSubmit, isEdit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (initialValues) {
      form.resetFields();
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : null,
        timeFrom: initialValues.timeFrom
          ? dayjs(initialValues.timeFrom, 'HH:mm')
          : null,
        timeTill: initialValues.timeTill
          ? dayjs(initialValues.timeTill, 'HH:mm')
          : null,
      });

      if (initialValues.event_url) {
        setFileList([
          {
            uid: '-1',
            name: 'event.png',
            status: 'done',
            url: initialValues.event_url,
          },
        ]);
      }
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const beforeUpload = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      message.error('You can only upload JPG/JPEG/PNG files!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('subtitle', values.subtitle);
    formData.append('city', values.city);
    formData.append('address', values.address);
    formData.append('capacity', values.capacity);
    formData.append('description', values.description);
    formData.append('date', values.date?.format('YYYY-MM-DD'));
    formData.append('timeFrom', values.timeFrom?.format('HH:mm'));
    formData.append('timeTill', values.timeTill?.format('HH:mm'));

    formData.append(
      'keyhighlights',
      values.keyhighlights ? JSON.stringify(values.keyhighlights) : '[]',
    );
    formData.append(
      'whoShouldAttend',
      values.whoShouldAttend ? JSON.stringify(values.whoShouldAttend) : '[]',
    );

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('event_url', fileList[0].originFileObj);
    }

    onSubmit(formData);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isEdit ? 'Edit Event' : 'Create Event'}
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Form.Item name="name" label="Event Name" rules={[{ required: true }]}>
          <Input placeholder="Enter event name" />
        </Form.Item>
        <Form.Item
          name="subtitle"
          label="Subtitle"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter subtitle" />
        </Form.Item>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true }]}
          className="sm:col-span-2 lg:col-span-2"
        >
          <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item name="date" label="Event Date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="timeFrom"
          label="Start Time"
          rules={[{ required: true }]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>
        <Form.Item
          name="timeTill"
          label="End Time"
          rules={[{ required: true }]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>
        <Form.Item
          name="whoShouldAttend"
          label="Who Should Attend"
          rules={[{ required: true }]}
        >
          <Select mode="tags" tokenSeparators={[',']} />
        </Form.Item>
        <Form.Item
          name="keyhighlights"
          label="Key Highlights"
          rules={[{ required: true }]}
        >
          <Select mode="tags" tokenSeparators={[',']} />
        </Form.Item>
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Enter capacity" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
          className="sm:col-span-2 lg:col-span-2"
        >
          <Input.TextArea rows={4} placeholder="Enter event description" />
        </Form.Item>
        <Form.Item
          name="event_url"
          label="Event Image"
          className="sm:col-span-2 lg:col-span-1"
          rules={[
            {
              required: !isEdit,
              message: 'Please upload an event image!',
            },
          ]}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={(info) => {
              setFileList(info.fileList);
              form.setFieldsValue({
                event_url: info.fileList.length ? info.fileList : undefined,
              });
            }}
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}

        <div className="sm:col-span-2 lg:col-span-3 flex justify-center">
          <Button type="primary" htmlType="submit" className="text-lg py-2">
            {isEdit ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminEventForm;

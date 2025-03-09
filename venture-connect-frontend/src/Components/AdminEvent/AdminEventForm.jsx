import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // For date/time validation

const AdminEventForm = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  // Handle file upload
  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      setFile(info.file.originFileObj); // Store file in state
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Validate file before upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE; // Prevent upload
    }
    return true;
  };

  // Validate end time is after start time
  const validateEndTime = (_, value) => {
    const startTime = form.getFieldValue("timeFrom");
    if (startTime && value && value.isBefore(startTime)) {
      return Promise.reject("End time cannot be before start time!");
    }
    return Promise.resolve();
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formattedEvent = {
      ...values,
      keyhighlights: values.keyhighlights || [],
      whoShouldAttend: values.whoShouldAttend || [],
      date: values.date.format("YYYY-MM-DD"),
      timeFrom: values.timeFrom.format("HH:mm"),
      timeTill: values.timeTill.format("HH:mm"),
      eventFile: file, // Include uploaded file
    };

    console.log("Form Values:", JSON.stringify(formattedEvent, null, 2)); // Print values

    try {
      // Simulate API call
      // await createEvent(formattedEvent);
      message.success("Event created successfully!");
      form.resetFields();
      setFile(null);
    } catch (error) {
      message.error("Failed to create event.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Event</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Event Name */}
        <Form.Item
          name="name"
          label="Event Name"
          rules={[{ required: true, message: "Please enter the event name!" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        {/* Subtitle */}
        <Form.Item
          name="subtitle"
          label="Subtitle"
          rules={[{ required: true, message: "Please enter the subtitle!" }]}
        >
          <Input placeholder="Enter event subtitle" />
        </Form.Item>

        {/* City */}
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please enter the city!" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        {/* Address */}
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address!" }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        {/* Capacity */}
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[
            {
              type: "number",
              required:"true",
              min: 1,
              message: "Capacity must be at least 1!",
            },
          ]}
        >
          <Input type="number" placeholder="Enter capacity" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        {/* Key Highlights */}
        <Form.Item
          name="keyhighlights"
          label="Key Highlights"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            placeholder="Enter key highlights"
            tokenSeparators={[","]}
          />
        </Form.Item>

        {/* Who Should Attend */}
        <Form.Item
          name="whoShouldAttend"
          label="Who Should Attend"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            placeholder="Enter target audience"
            tokenSeparators={[","]}
          />
        </Form.Item>

        {/* Event Date */}
        <Form.Item
          name="date"
          label="Event Date"
          rules={[{ required: true, message: "Please select the event date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Start Time */}
        <Form.Item
          name="timeFrom"
          label="Start Time"
          rules={[{ required: true, message: "Please select the start time!" }]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>

        {/* End Time */}
        <Form.Item
          name="timeTill"
          label="End Time"
          rules={[
            { required: true, message: "Please select the end time!" },
            { validator: validateEndTime },
          ]}
        >
          <TimePicker className="w-full" format="HH:mm" />
        </Form.Item>

        {/* File Upload */}
        <Form.Item
          name="eventFile"
          label="Event File (Image)"
          rules={[
            {
              required: true,
              message: "Please upload an image file!",
            },
          ]}
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            showUploadList={true}
            multiple={false}
            maxCount={1} // Allow only one file
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEventForm;
import React, { useState } from 'react';
import { Upload, Button, Input, Select, Slider, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddOpportunity = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent auto upload
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6 ">
      <Card className="w-full max-w-5xl p-8 rounded-lg shadow-xl bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Add a New <span className="text-blue-500">Startup Opportunity</span>
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Provide details about the investment opportunity
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-6">
          <div className="w-48 h-48 rounded-lg overflow-hidden shadow-md border border-gray-300 flex justify-center items-center bg-gray-200">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Cover Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-500">Image Preview</span>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button
                icon={<UploadOutlined />}
                className="border-blue-500 text-blue-500 flex items-center gap-2 px-4 py-2 rounded-md"
              >
                Upload Cover Image
              </Button>
            </Upload>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Opportunity Name
            </label>
            <Input
              placeholder="Enter Opportunity Name"
              className="rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Startup Stage
            </label>
            <Select placeholder="Select stage" className="w-full rounded-md">
              <Option value="seed">Seed</Option>
              <Option value="series-a">Series A</Option>
              <Option value="series-b">Series B</Option>
            </Select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Investment Domain
            </label>
            <Input
              placeholder="Choose industry or domain"
              className="rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Investment Range
            </label>
            <Slider
              range
              min={0}
              max={1000}
              defaultValue={[100, 500]}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Brief Description
          </label>
          <Input.TextArea
            rows={4}
            placeholder="Enter brief description"
            className="rounded-md"
          />
        </div>

        <div className="mt-8 text-center">
          <Button
            type="primary"
            className="bg-blue-500 px-6 py-2 rounded-md text-white"
          >
            Add Opportunity
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddOpportunity;

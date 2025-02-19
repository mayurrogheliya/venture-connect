import React, { useState } from 'react';
import { Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
      </Card>
    </div>
  );
};

export default AddOpportunity;

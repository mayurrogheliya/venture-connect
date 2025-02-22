import { useState } from "react";
import { Upload } from "antd";
import { ImUpload2 } from "react-icons/im";

const ProfileImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = (info) => {
    const file = info.file;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result); // Set the uploaded image preview
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center">
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload({ file });
          return false; // Prevent actual upload
        }}
      >
        <div className="relative w-24 h-24 rounded-full border-2 border-gray-300 flex justify-center items-center cursor-pointer hover:border-blue-500">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <ImUpload2 className="text-2xl" />
              <span className="text-xs">Upload</span>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
};

export default ProfileImageUpload;

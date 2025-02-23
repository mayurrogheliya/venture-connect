import { useState } from "react";
import { Upload, message } from "antd";
import { ImUpload2 } from "react-icons/im";

const ProfileImageUpload = ({ onImageUpload }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = (info) => {
    const file = info.file;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      message.error("Only image files are allowed!");
      onImageUpload(null); // Notify parent that image is invalid
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result); // Set uploaded image preview
      onImageUpload(file); // Send the image file to parent
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

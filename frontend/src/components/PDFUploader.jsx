import React, { useState } from "react";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";

const PDFUploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [fileUrl, setFileUrl] = useState("");
  // const [fileName, setFilename] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    try {
      setUploading(true);
      setProgress(0);

      const totalDuration = 2000;
      const intervalTime = 50;
      const increment = 100 / (totalDuration / intervalTime);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + increment >= 100) {
            clearInterval(interval);
            setProgress(100);
          }
          return prev + increment;
        });
      }, intervalTime);

      const res = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // setFileUrl(res.data.path);
      // setFilename(res.data.filename);

      setTimeout(() => {
        setUploading(false);
        onUploadSuccess(res.data);
      }, totalDuration);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!uploading && (
        <label
          htmlFor="pdfUpload"
          className="flex flex-col items-center justify-center 
                     w-full max-w-lg h-64 sm:h-72 md:h-80 
                     bg-white rounded-xl shadow-md border border-gray-200 
                     cursor-pointer hover:shadow-lg transition text-center p-6"
        >
          <FiUploadCloud className="text-purple-500 text-4xl sm:text-5xl" />
          <p className="font-medium text-lg sm:text-xl md:text-2xl text-gray-800 mt-6">
            Upload PDF to start chatting
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2">
            Click or drag and drop your file here
          </p>
          <input
            id="pdfUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {uploading && (
        <div className="w-full max-w-md text-center">
          <p className="text-purple-600 font-medium mb-2">
            Uploading PDF {Math.min(Math.round(progress), 100)}%
          </p>
          <div className="w-full bg-purple-100 rounded-full h-2.5">
            <div
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-50"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;

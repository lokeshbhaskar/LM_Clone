import React, { useState } from "react";
import PDFUploader from "./components/PDFUploader";
import PDFViewer from "./components/PDFViewer";
import axios from "axios";

function App() {
  const [pdfData, setPdfData] = useState(null);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleUploadSuccess = async(data)=>{
    try {
      setPdfData(data);
      await axios.get(`${API_URL}/api/pdf/extract/${data.filename}`)
      console.log("pdf extracted uploaded successfuly");
    } catch (error) {
      console.error("Error extracting PDF text:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      {!pdfData ? (
        <PDFUploader onUploadSuccess={handleUploadSuccess} />
      ) : (
        <PDFViewer fileUrl={`${API_URL}${pdfData.path}`}
        filename={pdfData.filename}
        />
      )}
    </div>
  );
}

export default App;

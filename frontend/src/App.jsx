import React, { useState } from "react";
import PDFUploader from "./components/PDFUploader";
import PDFViewer from "./components/PDFViewer";
import axios from "axios";

function App() {
  const [pdfData, setPdfData] = useState(null);

  const handleUploadSuccess = async(data)=>{
    try {
      setPdfData(data);
      await axios.get(`http://localhost:5000/api/pdf/extract/${data.filename}`)
      console.log("odf extracted uploaded successfuly");
    } catch (error) {
      console.error("Error extracting PDF text:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      {!pdfData ? (
        <PDFUploader onUploadSuccess={handleUploadSuccess} />
      ) : (
        <PDFViewer fileUrl={`http://localhost:5000${pdfData.path}`}
        filename={pdfData.filename}
        />
      )}
    </div>
  );
}

export default App;

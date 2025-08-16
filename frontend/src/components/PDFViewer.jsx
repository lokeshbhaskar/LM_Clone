import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { FcNext, FcPrevious } from "react-icons/fc";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import ChatPage from "./ChatPage";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFViewer = ({ fileUrl, filename }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(fileUrl);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex w-full gap-5 ">
      <div className="w-1/3 border-r pr-3">
        <ChatPage filename={filename} />
      </div>
      <div className="w-2/3 h-screen overflow-y-auto border">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => console.error("PDF load error:", err)}
          loading={<p className="text-center">Loading PDF...</p>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div className="flex justify-center items-center">
          <button
            className="px-3 py-2 "
            onClick={() =>
              setPageNumber((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={numPages <= 1}
          >
            {" "}
            <FcPrevious size={30} />{" "}
          </button>
          <p className="text-lg font-bold">
            Page {pageNumber} of {numPages}
          </p>
          <button
            className="px-3 py-2 "
            onClick={() =>
              setPageNumber((prev) => (prev < numPages ? prev + 1 : prev))
            }
            disabled={pageNumber >= numPages}
          >
            {" "}
            <FcNext size={30} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;

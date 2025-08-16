import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

import "dotenv/config";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

 
const extractedTexts = {};

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.resolve(__dirname, "../uploads", req.file.filename);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    
    extractedTexts[req.file.filename] = data.text;

    console.log("Extracted text saved for:", req.file.filename);

    res.json({
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      message: "File uploaded & text extracted successfully",
    });
  } catch (err) {
    console.error("Error in uploadPDF:", err);
    res.status(500).json({ message: "Error uploading & extracting PDF" });
  }
};

export const chatWithPDF = async (req, res) => {
  try {
    const { filename, question } = req.body;

    // console.log("filename:", filename);
    // console.log("question:", question);
    // console.log("Stored PDFs:", Object.keys(extractedTexts));

    if (!filename) {
      return res.status(400).json({ message: "Filename is required" });
    }
    if (!extractedTexts[filename]) {
      return res.status(400).json({ message: "Please extract PDF text first" });
    }
    if (!question || question.trim() === "") {
      return res.status(400).json({ message: "Question cannot be empty" });
    }

   
    const prompt = `
You are an assistant. Here is the extracted PDF content:

${extractedTexts[filename]}

The user asked: "${question}"

👉 Answer strictly from the PDF.  
If the answer is not present, reply: "The PDF does not contain this information."
    `;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    res.json({ answer });
  } catch (error) {
    console.error("❌ Error chatting with PDF:", error.message);
    res
      .status(500)
      .json({ message: "Error generating answer", error: error.message });
  }
};

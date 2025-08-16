# 📘 LM_Clone - Google NotebookLM Clone

LM_Clone is a web application that allows users to **upload PDFs**, ask **questions** about the content, and receive **AI-powered answers** with **page citations** and **PDF navigation** support.  
It is designed as a **clone of Google NotebookLM**, making document-based Q&A seamless.

---

## 🚀 Features
- 📂 Upload PDF documents  
- 🤖 Ask questions and get AI-generated answers  
- 📑 Page citations with buttons for quick navigation  
- 📜 Multi-page PDF support (Prev/Next navigation or citation buttons)  
- 🎯 Clean and simple UI  

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Express  
- **AI Processing**: OpenAI API (or any LLM API)  
- **PDF Handling**: `pdf-parse`, `pdfjs`  

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/lokeshbhaskar/LM_Clone.git
cd LM_Clone
cd backend
npm install
cd frontend
npm install
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
cd backend
npm start
🤝 Contribution
Pull requests are welcome! If you’d like to add new features, please fork the repo and create a PR.
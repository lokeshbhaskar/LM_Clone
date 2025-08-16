import React, { useState } from "react";
import axios from "axios";
import { CgFileDocument } from "react-icons/cg";
import { IoSend } from "react-icons/io5";

const ChatPage = ({ filename }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setQuestion("");

    try {
      const res = await axios.post("http://localhost:5000/api/pdf/chat", {
        filename,
        question,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.answer },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error getting answer." },
      ]);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 p-3 sm:p-5">
        {/* Document ready message */}
        <div className="flex items-center gap-3 sm:gap-5 bg-white p-3 sm:p-4 rounded shadow">
          <CgFileDocument className="text-purple-500 text-2xl sm:text-3xl" />
          <p className="text-base sm:text-lg md:text-xl text-purple-500 font-medium">
            Your document is ready!
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 sm:p-3 rounded shadow 
              max-w-[80%] sm:max-w-[70%] md:max-w-[60%] break-words
              ${
                msg.role === "user"
                  ? "bg-purple-500 text-white self-end"
                  : "bg-white text-gray-900 self-start"
              }`}
          >
            <p className="text-sm sm:text-base">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="w-full flex items-center border-2 border-purple-400 rounded-lg p-2 sm:p-3 bg-white">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your message..."
          className="p-2 sm:p-3 outline-none rounded w-full text-sm sm:text-base"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ml-2">
          <IoSend className="text-purple-500 text-2xl sm:text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

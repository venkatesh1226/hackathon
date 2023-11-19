import React, { useState } from "react";
import "./Chatbot.css";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true,
});

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async () => {
    const prompt = ` The goal is to thoroughly analyze the budget speeches from 2004 to 2015, focusing on understanding the changes in economic policies, fiscal strategies, and financial allocations by Indian Government.
      Dont answer the questions if it is not related to Indian economy/welfare of Indians.
      if questions are other that budget speech or economy related questions are asked, please answer as "I dont know".
      `;
    // Push user message to chat
    setMessages([...messages, { type: "user", text: userInput }]);

    // Make an API call to get the bot response

    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt + userInput }],
      model: "gpt-3.5-turbo",
    });
    console.log(response);

    const data = response.choices[0].message;

    // Push bot message to chat
    setMessages([
      ...messages,
      { type: "user", text: userInput },
      { type: "bot", text: data.content },
    ]);

    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={message.type}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <textarea
            rows={3}
            cols={35}
            placeholder={"Enter Questions Related to Indian Budget Speeches"}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          ></textarea>

          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Chatbot;

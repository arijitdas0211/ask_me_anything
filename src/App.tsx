import React, { useState } from "react";
import "./App.css";
import logo from "./assets/img/logo.png";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const apiKey = import.meta.env.VITE_API_KEY as string;
if (!apiKey) {
  console.error("API key is missing.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function App() {
  const [value, setValue] = useState<string>(""); // User input state
  const [resultText, setResultText] = useState<string>(""); // State to store result text
  const [error, setError] = useState<string | null>(null); // State to store errors

  const run = async (e: { preventDefault: () => void; }) => {
    const prompt = value;

    if (!prompt) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      e.preventDefault();
      const result = await model.generateContent(prompt);
      const responseText = result.response.text(); // Await the text response
      setValue("");
      setResultText(responseText); // Update state with the result text
      setError(null); // Clear any previous errors
    } catch (error: any) {
      console.error("Error generating content:", error);
      setError(`Failed to generate content. ${error.message}`);
    }
  };

  return (
    <>
      <div className="logo_float">
        <img
          src={logo}
          alt="AI ROBOT LOGO"
          width={50}
          className="img-fluid shadow"
        />
      </div>
      <h1 className="text-center mt-5">
        <span className="header_text neonText">Ask me anything...</span>
      </h1>
      <div className="search_box">
        <div className="mb-3">
          <input
            autoFocus
            type="text"
            className="form-control search_input"
            placeholder="Enter your prompt here..."
            aria-label="Search here..."
            aria-describedby="button-addon2"
            name="query"
            value={value}
            onChange={(event) => setValue(event.target.value)} // Update state with input value
          />
          <button
            onClick={run}
            className="btn btn-primary shadow-lg srch_btn"
            type="button"
            id="button-addon2"
            title="Generate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              width="20"
              viewBox="0 0 576 512"
            >
              <path
                fill="#ffffff"
                d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"
              />
            </svg>
          </button>
        </div>
      </div>
      {error && console.log({ error })}
      {/* Display error if it exists */}
      {resultText ? (
        <div className="result_box">
          <ReactMarkdown>{resultText}</ReactMarkdown>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

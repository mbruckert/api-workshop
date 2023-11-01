import React, { useState } from "react";
import Logo from "./assets/logo.png";
import Waiting from "./assets/waiting.png";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  function generateImage() {
    if (prompt == "") {
      toast.error("Please enter a prompt");
      return;
    }
    const apiRequest = new Promise((resolve, reject) => {
      fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setImage(data.data[0].url);
          resolve(data.data[0].url);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    toast.promise(apiRequest, {
      loading: "Generating image...",
      success: <b>Image Generated!</b>,
      error: <b>Image Generation Failed!</b>,
    });
  }

  return (
    <div className="App">
      <header
        style={{
          width: "100%",
          backgroundColor: "#544D8E",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <img src={Logo} style={{ width: "170px", marginLeft: "20px" }} />
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <h1 style={{ fontWeight: "900", fontSize: "40px" }}>
          AI Photo Generator
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "700px",
          }}
        >
          <h4 style={{ fontSize: "20px" }}>Your Prompt</h4>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              boxShadow: "0px 4px 14px 0px rgba(159, 159, 159, 0.25) inset",
              border: "1px solid #C9C9C9",
              borderRadius: "15px",
              padding: "10px",
              marginTop: "-10px",
            }}
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
            placeholder="What image do you want to generate?"
          ></textarea>
          <button
            style={{
              border: "1px solid #CBCBCB",
              boxShadow: "0px 0px 17px -7px rgba(0, 0, 0, 0.25)",
              width: "102%",
              fontSize: "20px",
              fontWeight: "700",
              color: "#544D8E",
              paddingTop: "10px",
              paddingBottom: "10px",
              borderRadius: "10px",
              marginTop: "20px",
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            className="generate-button"
            onClick={() => {
              generateImage();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: "25px" }}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                clipRule="evenodd"
              />
            </svg>
            Generate Image
          </button>
          <h4 style={{ fontSize: "20px" }}>Generated Image</h4>
          <div
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #C9C9C9",
              borderRadius: "15px",
              backgroundImage:
                image == "" ? `url(${Waiting})` : `url(${image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              marginTop: "-10px",
            }}
          ></div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;

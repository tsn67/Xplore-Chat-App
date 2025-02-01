import React, { useState } from "react";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [state, setState] = useState("initial");

  function sendInput() {
    setInput("");
  }

  const wishWord = "Goodmorning, how can I help you?";

  return (
    <div className="md:w-[350px] md:h-[400px] h-[80vh] w-[400px] outline outline-1 outline-[#51A8FF] bg-black/60 relative backdrop-blur-sm">
      {state == "initial" && (
        <div className="h-[84%] w-[100%] grid place-content-center">
          <div className="flex flex-col items-center justify-center">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ ease: "linear", duration: 10, repeat: Infinity }}
              width="120"
              height="121"
              viewBox="0 0 120 121"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(1 0 0 -1 63.5898 64.6172)"
                fill="#FBF840"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(1 0 0 -1 0 64.2773)"
                fill="#FBF840"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(0.707107 0.707107 0.707107 -0.707107 59.8281 66.4375)"
                fill="#4CCA72"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(0 1 1 0 56.4082 -0.00195312)"
                fill="#5349C2"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 59.666 55.7812)"
                fill="#4CCA72"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 99.7148 15.8965)"
                fill="#FF2C2C"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(-0.707107 0.707107 0.707107 0.707107 54.5859 61.3574)"
                fill="#FF2C2C"
              />
              <ellipse
                cx="28.2048"
                cy="3.5897"
                rx="28.2048"
                ry="3.5897"
                transform="matrix(0 1 1 0 56.4082 64.2773)"
                fill="#5349C2"
              />
            </motion.svg>

            <div className="flex flex-row">
              {wishWord.split("").map((char, index) => {
                return (
                  <motion.p
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="text-white"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {char}
                  </motion.p>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {state == "chat" && <div className="h-[84%] w-[100%]"></div>}

      <div className="h-[16%] w-full p-2 flex flex-row items-center">
        <div
          className={`flex flex-row items-center justify-between h-full w-[100%] bg-black outline outline-1 ${
            input.length !== 0 ? "outline-[#51A8FF]" : "outline-gray-400"
          }`}
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendInput();
              }
            }}
            className="border-none outline-none text-white bg-transparent px-2 box-border w-4/5"
            placeholder="ask xplore ai assistant?"
          />

          <div
            className={`rounded-[2px] grid place-content-center h-[40px] w-[40px]  mr-2 ${
              input.length != 0 ? "bg-[#2282FF]" : "bg-gray-600"
            }`}
          >
            <svg
              width="26"
              height="27"
              viewBox="0 0 26 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 27V0L26 13.5L0 27ZM2.73684 21.9375L18.9526 13.5L2.73684 5.0625V10.9688L10.9474 13.5L2.73684 16.0312V21.9375Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

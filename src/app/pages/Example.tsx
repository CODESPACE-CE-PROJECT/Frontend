"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import XtermTerminal from "../components/terminal";

export default function Example() {
  const [sourceCode, setSourceCode] = useState("");
  const [input, setInput] = useState("");
  const [showOutput, setShowOutput]: any = useState("");

  const sendToXterm = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_COMPILER}/terminal`, {
        container_id: `${process.env.NEXT_PUBLIC_CONTAINER_ID}`,
        sourceCode: sourceCode,
        language: "cpp",
        fileName: "",
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const sendCode = () => {
    axios
      .post("https://compiler-api.unixvextor.com/compiler/", {
        sourceCode: sourceCode,
        language: "cpp",
        input: input,
      })
      .then(
        (response) => {
          if (process.env.NODE_ENV === "development") {
            console.log(response.data);
          }
          setShowOutput(response.data);
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
          }
        }
      );
  };

  const onChange: any = (value: string, ev: any[]) => {
    setSourceCode(value);
  };

  const handleOnClick = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("Button clicked");
    }
    // sendCode();
    sendToXterm();
  };

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 16,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,

    LineNumber: "on",
    padding: {
      top: 5,
    },
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex flex-row justify-end m-1 mr-5 ">
          <button
            onClick={handleOnClick}
            className="px-5 py-2 text-white bg-[#068632] rounded-md"
          >
            Run▸
          </button>
        </div>

        <div className="flex flex-row w-full gap-5">
          <Editor
            height="80vh"
            width="100vw"
            defaultLanguage="cpp"
            defaultValue={`#include <iostream>

int main() {
  std::cout << "Hello World!";
  return 0;
}`}
            onChange={onChange}
            theme="vs-dark"
            options={options}
          />

          <XtermTerminal />
          {/* <div className="p-2 pt-0 bg-[#161D2D] text-xl text-[#C2C8CC] w-3/4 ">
            <div className="mb-10">
              <span className="font-semibold w-full">
                Input
                <br />
              </span>
              <input
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="pl-5 bg-[#1C2333] w-full h-12"
                type="text"
                placeholder="input"
              />
            </div>
            <div className="mb-10">
              <span className="font-semibold w-full">
                Output
                <br />
              </span>
              <p className="pl-5 bg-[#1C2333]">{showOutput.data}</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

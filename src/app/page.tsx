"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function Home() {
  const [sourceCode, setSourceCode] = useState("");
  const [input, setInput] = useState("");
  const [showOutput, setShowOutput]: any = useState("");

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
    sendCode();
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
      <div className="flex-row">
        <div className="grid justify-items-end m-1 mr-5 ">
          <button
            onClick={handleOnClick}
            className="px-5 py-2 bg-green-600 rounded-md"
          >
            Run▸
          </button>
        </div>

        <Editor
          height="60vh"
          defaultLanguage="cpp"
          defaultValue={``}
          onChange={onChange}
          theme="vs-dark"
          options={options}
        />

        <div>
          <span className="text-lg">input:&nbsp;</span>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="text-[#000000]"
            type="text"
            placeholder="input"
          />
        </div>
        <div className="bg-green-800">
          <span className="text-lg">
            output:<br></br>
          </span>
          {showOutput.data}
        </div>
      </div>
    </>
  );
}

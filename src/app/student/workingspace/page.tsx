"use client";

import React, { useState } from "react";
import axios from "axios";
import FileExplorer from "@/app/components/WorkingSpaceItems/FileExplorer";

import WorkSpaceEditor from "@/app/components/WorkingSpaceItems/WorkSpaceEditor";
import WorkSpaceTerminal from "@/app/components/WorkingSpaceItems/WorkSpaceTerminal";

export default function WorkingSpace() {
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

  return (
    <>
      <div className="flex flex-col text-white">
        <div className="flex flex-row justify-between">
          <FileExplorer />

          {/* Text Editor */}
          <WorkSpaceEditor />

          {/* Output */}
          <WorkSpaceTerminal />
        </div>
      </div>
    </>
  );
}

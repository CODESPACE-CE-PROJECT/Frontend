"use client";

import React, { useState } from "react";
import axios from "axios";
import FileExplorer from "@/components/Editor/FileExplorer";
import WorkSpaceEditor from "@/components/Editor/WorkSpaceEditor";
import WorkSpaceTerminal from "@/components/Editor/WorkSpaceTerminal";

export default function Page() {
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
      <FileExplorer />

      <WorkSpaceEditor />

      {/* Output */}
      <WorkSpaceTerminal />
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Description from "@/app/components/Description";
import TextEditter from "@/app/components/TextEditter";
import TestCase from "@/app/components/TestCase";
import Home from "@/app/page";
import HomeworkNav from "@/app/components/HomeworkNav";
import axios from "axios";

export default function HomeWorkSpace() {
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
      {/* Popup */}
      <HomeworkNav />
      {/* Popup */}

      <div className="flex">
        <div className=" w-9/12	pl-4 pb-5">
          <Description />
        </div>
        <div className="flex flex-col pr-4 ">
          <div className="pl-4">
            <TextEditter />
          </div>
          <div className="pl-4 pt-5 ">
            <TestCase />
          </div>
        </div>
      </div>
    </>
  );
}

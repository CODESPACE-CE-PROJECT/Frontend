"use client";

import React, { useState } from "react";
import Image from "next/image";
import Description from "@/app/components/Description";
import TextEditter from "@/app/components/TextEditter";
import TestCase from "@/app/components/TestCase";
import Home from "@/app/page";
import HomeworkNav from "@/app/components/HomeworkNav";
import axios from "axios";
import ListIcon from '@mui/icons-material/List';
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
      {/* <HomeworkNav /> */}
      {/* Popup */}

      <div className="text-white text-2xl ml-4 mb-5">

        ทดสอบความรู้เบื้องต้น
      </div>

      <button className="flex items-center gap-2 px-2 py-3 mb-5 ml-4 text-white bg-[#161f2e] rounded-lg hover:bg-[#1e2a3b] ">
        <ListIcon />
        <span>โจทย์ปัญหา</span>
      </button>


      <div className="flex flex-row">
        
        <div className="flex flex-col w-8/12 pl-4">
          <div className="">
            <Description />
          </div>
          <div className="pt-5">
            <TestCase />
          </div>
        </div>

        <div className=" pr-4 ml-5">
          <TextEditter />
        </div>
      </div>



    </>
  );
}

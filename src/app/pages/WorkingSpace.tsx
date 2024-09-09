import { useState } from "react";
import Image from "next/image";
import WorkHeadNav from "../components/WorkHeadNav";
import Editor from "@monaco-editor/react";
import axios from "axios";

import dropDownIcon from "../../app/assets/WorkingAssets/dropDownIcon.svg";
import dirIcon from "../../app/assets/WorkingAssets/dirIcon.svg";
import newFileIcon from "../../app/assets/WorkingAssets/newFileIcon.svg";
import newDirIcon from "../../app/assets/WorkingAssets/newDirIcon.svg";
import dotIcon from "../../app/assets/WorkingAssets/3dotIcon.svg";
import logos_cpp from "../../app/assets/WorkingAssets/logos_cpp.svg";
import closeIcon from "../../app/assets/WorkingAssets/closeIcon.svg";

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
      <div className="flex flex-col text-white m-4">
        {/* head */}
        <WorkHeadNav />

        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[15vw]">
            <input
              className="bg-[#21293B] text-[#C2C8CC] text-lg rounded-md p-2 mb-5 w-full"
              placeholder="ค้นหา"
              type="text"
            />

            <div className="flex flex-row justify-between mb-3">
              <div className="flex flex-row items-center space-x-2 ml-2">
                <Image className="w-3" src={dropDownIcon} alt=""></Image>
                <p className="text-lg">ไฟล์</p>
                <Image className="w-5" src={dirIcon} alt=""></Image>
              </div>

              <div className="flex flex-row items-center space-x-3 pr-2">
                <Image className="w-5" src={newFileIcon} alt=""></Image>
                <Image className="w-6" src={newDirIcon} alt=""></Image>
                <Image className="w-1" src={dotIcon} alt=""></Image>
              </div>
            </div>

            <div className="flex flex-row bg-[#2B3245] text-[#C2C8CC] rounded-md space-x-2 p-2 mb-3">
              <Image className="w-5" src={logos_cpp} alt=""></Image>
              <p>main.cpp</p>
            </div>
            <div className="self-center border border-dashed border-b opacity-60 border-gray-400 w-[97%] mb-2"></div>
            <div className="text-[#C2C8CC] ml-2">Packager files</div>
          </div>

          {/* Text Editor */}
          <div className="bg-red-500 w-[45vw]">
            <div className="flex bg-[#161D2D]">
              <div className="flex flex-row bg-[#1C2333] rounded-t-lg border-[#0085FF] border-t-2  space-x-3 p-2 ">
                <Image className="w-5" src={logos_cpp} alt=""></Image>
                <p className="text-[#C2C8CC]">main.cpp</p>
                <Image className="w-3" src={closeIcon} alt=""></Image>
              </div>
            </div>

            <div className="flex bg-[#161D2D]">
              <Image className="w-5" src={logos_cpp} alt=""></Image>
              <p className="text-[#C2C8CC]">main.cpp</p>
            </div>
          </div>

          {/* Output */}
          <div className="bg-red-500 w-[35vw]">Terminal</div>
        </div>
      </div>
    </>
  );
}

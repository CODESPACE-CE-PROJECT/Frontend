import React, { useState } from "react";
import TestcaseIcon from "../../../src/app/assets/HomeworkAssets/testcase.svg";
import Image from "next/image";

export default function TestCase() {
  const testCases = [
    {
      id: 1,
      input: "[2, 7, 11, 15], target = 9",
      output: "[0, 1]",
    },
    {
      id: 2,
      input: "[3, 2, 4], target = 6",
      output: "[1, 2]",
    },
    {
      id: 3,
      input: "[3, 3], target = 6",
      output: "[0, 1]",
    },
  ];

  const renderCase = (testCase) => (
    <div className="pt-3 pb-3">
      <div className="pb-4">Input =</div>
      <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3">
        {testCase.input}
      </div>
      <div className="pb-3 pt-3">Output =</div>
      <div className="bg-[#2b3445] rounded-md pl-4 pt-3 pb-3">
        {testCase.output}
      </div>
    </div>
  );

  const [currentCase, setCurrentCase] = useState(renderCase(testCases[0]));

  return (
    <>
      <div>
        <div className="bg-[#161e2e] rounded-t-lg text-[#a2a5ab] pt-1 pl-2 flex flex-row pb-1">
          <Image src={TestcaseIcon} alt="Testcase Icon" className="w-4" />
          <div className="pl-2">Testcase</div>
        </div>
        <div className="bg-[#1c2333] text-xl text-[#C2C8CC] rounded-b-lg h-96">
          <div className="text-white pl-3 pr-4">
            <div className="flex flex-row space-x-4 pt-3">
              {testCases.map((testCase) => (
                <button
                  key={testCase.id}
                  className="focus:bg-[#2b3445] hover:bg-[#2b3445] hover:text-[#ACAEB1] rounded-md h-9 w-20"
                  onClick={() => setCurrentCase(renderCase(testCase))}
                >
                  Case {testCase.id}
                </button>
              ))}
            </div>
            <div className="pt-4 pl-2">{currentCase}</div>
          </div>
        </div>
      </div>
    </>
  );
}

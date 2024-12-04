import React, { useState } from "react";
import TestcaseIcon from "../../../src/app/assets/HomeworkAssets/testcase.svg";
import Image from "next/image";

export default function TestCase() {

  return (
    <>
      <div>
        <div className="bg-[#161e2e] rounded-lg text-white pt-3 pl-2 pb-3 w-24 mb-3 ">
          <div className="pl-2">ตัวอย่าง 1</div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <h1 className=" font-bold mb-4 text-white">โจทย์ที่กำหนด</h1>
            <div className="bg-[#29394f] rounded-lg p-4 mb-4">
              <div className="text-gray-300 text-sm font-semibold">Input</div>
              <div className="text-white mt-2">[5, 5]</div>
            </div>
            <div className="bg-[#29394f] rounded-lg p-4">
              <div className="text-gray-300 text-sm font-semibold">Output</div>
              <div className="text-white mt-2">25</div>
            </div>
          </div>

          <div className="w-1/2">
            <h1 className=" font-bold mb-4 text-white">ผลลัพธ์</h1>
            <div className="bg-[#29394f] rounded-lg p-4 mb-4">
              <div className="text-gray-300 text-sm font-semibold">Input</div>
              <div className="text-white mt-2">[5, 5]</div>
            </div>
            <div className="bg-[#29394f] rounded-lg p-4">
              <div className="text-gray-300 text-sm font-semibold">Output</div>
              <div className="text-white mt-2">25</div>
            </div>
          </div>
        </div>


        <div className="bg-[#161e2e] rounded-lg text-white pt-3 pl-2 pb-3 w-24 mb-3 mt-4">
          <div className="pl-2">ตัวอย่าง 2</div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <h1 className=" font-bold mb-4 text-white">โจทย์ที่กำหนด</h1>
            <div className="bg-[#29394f] rounded-lg p-4 mb-4">
              <div className="text-gray-300 text-sm font-semibold">Input</div>
              <div className="text-white mt-2">[5, 5]</div>
            </div>
            <div className="bg-[#29394f] rounded-lg p-4">
              <div className="text-gray-300 text-sm font-semibold">Output</div>
              <div className="text-white mt-2">25</div>
            </div>
          </div>

          <div className="w-1/2">
            <h1 className=" font-bold mb-4 text-white">ผลลัพธ์</h1>
            <div className="bg-[#29394f] rounded-lg p-4 mb-4">
              <div className="text-gray-300 text-sm font-semibold">Input</div>
              <div className="text-white mt-2">[5, 5]</div>
            </div>
            <div className="bg-[#29394f] rounded-lg p-4">
              <div className="text-gray-300 text-sm font-semibold">Output</div>
              <div className="text-white mt-2">25</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

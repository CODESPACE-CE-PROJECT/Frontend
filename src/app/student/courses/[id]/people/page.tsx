"use client"; // Add this line at the top

import React, { useState } from "react";
import Image from "next/image";
import profileteacher from "@/app/assets/CommonAssets/profileteacher.svg";
import profilestudent from "@/app/assets/CommonAssets/profilestudent.svg";

export default function People() {
  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            สมาชิก
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      {/* head */}
      <div className="flex flex-col px-20 py-5">
        {/* Teacher section */}
        <div className="mb-16">
          <div className="border-b border-gray pb-2 mb-4 text-white text-2xl font-semibold">
            อาจารย์ผู้สอน
          </div>

          <div className="flex items-center space-x-4 text-white mb-6 shadow-xl pl-5">
            <Image
              className="w-20 h-20 rounded-full"
              src={profileteacher}
              alt="Profile Image"
            />
            <div className="text-lg font-semibold">Rattanaporn Somchainuek</div>
          </div>
        </div>
        {/* Members section */}
        <div className="border-b border-gray pb-2 mb-4 text-white text-2xl	 font-semibold">
          สมาชิก
        </div>

        {/* Student profiles section */}
        <div className="flex flex-col space-y-6 text-white ">
          {/* Student 1 */}
          <div className="flex items-center space-x-4 shadow-xl pl-5">
            <Image
              className="w-20 h-20 rounded-full  "
              src={profilestudent}
              alt="Profile Image"
            />
            <div className="text-lg font-semibold">Karnrawee Suttakul</div>
          </div>

          {/* Student 2 */}
          <div className="flex items-center space-x-4 shadow-xl pl-5">
            <Image
              className="w-20 h-20 rounded-full "
              src={profilestudent}
              alt="Profile Image"
            />
            <div className="text-lg font-semibold">Teerapat Wiwatkun</div>
          </div>

          {/* Student 3 */}
          <div className="flex items-center space-x-4 shadow-xl pl-5">
            <Image
              className="w-20 h-20 rounded-full  "
              src={profilestudent}
              alt="Profile Image"
            />
            <div className="text-lg font-semibold">Pimnara Suksamran</div>
          </div>
        </div>
      </div>
    </>
  );
}

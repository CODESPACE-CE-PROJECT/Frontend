"use client"; // Add this line at the top

import React, { useState } from "react";
import ClassAssignmentTable from "@/app/components/AssignmentItems/ClassAssignmentTable";

export default function Assignment() {
  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            การบ้าน
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      {/* head */}
      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        <ClassAssignmentTable />
      </div>
    </>
  );
}

"use client"; // Add this line at the top

import React, { useState } from "react";
import ClassRoomNav from "@/app/components/ClassRoomNav";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

export default function Classroom() {
  return (
    <>
      <div className="flex flex-row">
        <ClassRoomNav />

        <div className="text-[#FAFAFA] h-full w-full shadow-[-10px_0px_10px_-5px_rgba(0,0,0,0.3)]">
          <div className="relative w-full">
            <div className="flex pl-10">
              <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
                ทั่วไป
              </h1>
            </div>
            <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
          </div>

          {/* head */}
          <div className="flex flex-col items-center space-y-10 px-40 py-5">
            {/* box 1 */}
            <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

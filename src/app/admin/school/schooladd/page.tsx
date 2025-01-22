"use client";

import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

export default function schooladd() {
  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen">
        <div className="flex justify-between items-center self-stretch">
          <ArrowBackIosNewRoundedIcon className="text-[#FAFAFA]" />
          <span className="flex w-full p-[10px] text-3xl text-zinc-50">เพิ่มโรงเรียน</span>
        </div>

        {/* container Search and Button */}
        <div className="flex w- py-[32px] flex-col items-center gap-[149px]">
          <div className="flex w-[840px] flex-col items-center gap-[32px]">
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex flex-col justify-end items-end gap-[51px] self-stretch">
                <div className="flex flex-col items-start gap-[32px] self-stretch">
                  <div className="flex w-[840px] py-[24px] flex-col items-center gap-[16px] rounded-[12px] border-2 border-dashed border-[#2A3A50]">
                    <div className="flex w-[450px] h-[116px] flex-col items-center gap-[20px]">
                      <CloudUploadOutlinedIcon className="w-8 h-8 text-zinc-50" />
                      <span className=" text-zinc-50">เลือกรูปภาพโปรไฟล์ของโรงเรียน</span>
                      <span className=" text-[#CED4DA]">JPEG, PNG ขนาดไม่เกิน 50MB</span>
                    </div>
                    <button className="flex justify-center items-center py-3 px-6 rounded-[6px] border border-[#2A3A50] text-zinc-50" >เลือกไฟล์</button>
                  </div>

                  {/* รวม */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    {/* แพ็กเกจการใช้งาน */}
                    <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">แพ็กเกจการใช้งาน</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">เลือกแพ็กเกจการใช้งาน</span>
                        <KeyboardArrowDownRoundedIcon className="text-zinc-50" />
                      </div>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">จำกัดจำนวนคอร์ส</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">โปรดใส่จำนวนคอร์ส</span>
                      </div>
                    </div>
                  </div>

                  {/* รวม */}
                  <div className="flex items-start gap-[35px] self-stretch w-full">
                    {/* จำกัดจำนวนผู้สอน*/}
                    <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">จำกัดจำนวนผู้สอน</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">โปรดใส่จำนวนผู้สอน</span>
                        {/* <KeyboardArrowDownRoundedIcon className="text-zinc-50" /> */}
                      </div>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">จำกัดจำนวนผู้เรียน</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">โปรดใส่จำนวนผู้เรียน</span>
                      </div>
                    </div>
                  </div>

                  {/* รวมกำหนดสิทธิ์ */}
                  <div className="flex items-start gap-[35px] self-stretch w-full">
                    <div className="flex flex-col items-start gap-2.5 w-full justify-between">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">กำหนดสิทธิ์</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex gap-5">
                        <div className="flex gap-2.5 align-center">
                          <CheckBoxRoundedIcon className="text-[#5572FA]" />
                          <span className="text-zinc-50">สร้างผู้ใช้งาน</span>
                        </div>
                        <div className="flex gap-2.5 align-center">
                          <CheckBoxRoundedIcon className="text-[#5572FA]" />
                          <span className="text-zinc-50">แก้ไขข้อมูลผู้ใช้งาน</span>
                        </div>
                        <div className="flex gap-2.5 align-center">
                          <CheckBoxRoundedIcon className="text-[#5572FA]" />
                          <span className="text-zinc-50">ลบผู้ใช้งาน</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ที่อยู่ */}
                  <div className="flex items-start gap-[32px] self-stretch w-full ">
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">ที่อยู่</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-[72px] py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">1 ซอย ฉลองกรุง 1 </span>
                      </div>
                    </div>
                  </div>

                  {/* ตำบล อำเภอ */}
                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">แขวง / ตำบล</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4  gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">ลาดกระบัง</span>
                        <KeyboardArrowDownRoundedIcon className="text-zinc-50" />
                      </div>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">เขต / อำเภอ</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 justify-between gap-2.5 self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">ลาดกระบัง</span>
                        <KeyboardArrowDownRoundedIcon className="text-zinc-50" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-[32px] self-stretch w-full">
                    {/* จังหวัด / รหัสไปรษณีย์ */}
                    <div className="flex flex-col items-start gap-2.5 w-full ">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">จังหวัด</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex h-10 py-2 px-4 justify-between self-stretch rounded-[6px] bg-[#2A3A50]">
                        <span className="text-zinc-50">กรุงเทพ ฯ</span>
                        <KeyboardArrowDownRoundedIcon className="text-zinc-50" />
                      </div>
                    </div>

                    {/* จำกัดจำนวนคอร์ส */}
                    <div className="flex flex-col items-start gap-2.5 w-full">
                      <div className="flex justify-center items-center gap-2.5">
                        <span className="text-zinc-50">รหัสไปรษณีย์</span>
                        <span className="text-[#EF4343]">*</span>
                      </div>

                      <div className="flex w-full gap-3 self-stretch ">
                        <span className="flex w-4 h-10 px-4 py-2 justify-center items-center gap-3 text-zinc-50 rounded-[6px] bg-[#2A3A50]">1</span>
                        <span className="flex w-4 h-10 px-4 py-2 justify-center items-center gap-3 text-zinc-50 rounded-[6px] bg-[#2A3A50]">0</span>
                        <span className="flex w-4 h-10 px-4 py-2 justify-center items-center gap-3 text-zinc-50 rounded-[6px] bg-[#2A3A50]">2</span>
                        <span className="flex w-4 h-10 px-4 py-2 justify-center items-center gap-3 text-zinc-50 rounded-[6px] bg-[#2A3A50]">5</span>
                        <span className="flex w-4 h-10 px-4 py-2 justify-center items-center gap-3 text-zinc-50 rounded-[6px] bg-[#2A3A50]">0</span>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="flex align-center gap-4">
                  <button className="flex w-[160px] h-[54px] justify-center items-center py-3 px-4 rounded-[6px] border border-[#2A3A50] text-zinc-50" >ยกเลิก</button>
                  <button className="flex w-[160px] h-[54px] justify-center items-center py-3 px-4 rounded-[6px] border bg-[#5572FA] border-[#5572FA] text-zinc-50" >เพิ่ม</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

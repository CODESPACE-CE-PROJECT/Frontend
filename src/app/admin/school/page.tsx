"use client";

import React, { useState } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

export default function school() {
  return (
    <>
      <div className="flex flex-col items-center self-stretch gap-[80px] pt-[60px] pr-[60px] pb-[60px] pl-[60px] w-full h-screen bg-[#0B111B]">
        <span className="flex w-full p-[10px] text-3xl  text-neutral-50">โรงเรียน</span>

        {/* container Search and Button */}
        <div className="flex-col contents self-stretch gap-[36px] w-full lg:flex-row">

          {/* Search */}
          <div className="flex gap-9 self-stretch">
            <div className="flex items-center flex-grow gap-4 px-4 py-3 rounded-md border-2 border-[#2A3A50] w-auto">
              <SearchTwoToneIcon className=" text-neutral-50 w-4 h-4" />
              <span className="text-[18px]	text-neutral-50">ค้นหา</span>
            </div>

            {/* Button */}
            <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-md bg-[#5572FA] w-auto ">
              <AddRoundedIcon className="text-neutral-50 w-6 h-6" />
              <span className="text-[16px] text-neutral-50">เพิ่มโรงเรียน</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="table-auto w-full border-collapse text-neutral-50">
              <thead>
                <tr className="bg-[#304972] bg-opacity-30 text-[18px]">
                  <th className="px-6 py-3 rounded-l-md !font-normal truncate">ชื่อ</th>
                  <th className="px-6 py-3 !font-normal truncate">ที่ตั้ง</th>
                  <th className="px-6 py-3 !font-normal truncate">ผู้สอน</th>
                  <th className="px-6 py-3 !font-normal truncate">ผู้เรียน</th>
                  <th className="px-6 py-3 rounded-r-md !font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {/* data in Table */}
                <tr className="justify-center">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-5 truncate">
                      <img
                        src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png"
                        alt="icon"
                        className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex-shrink-0"
                      />
                      <span className="truncate">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[14px] truncate">
                    1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520
                  </td>
                  <td className="text-center text-[20px]">1</td>
                  <td className="px-6 py-4 text-center text-[20px]">2</td>
                  <td className="px-6 py-4 flex justify-center">
                    <div className="h-9 w-9 flex items-center justify-center rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </td>
                </tr>

                {/* data in Table */}
                <tr className="justify-center">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-5 truncate">
                      <img
                        src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png"
                        alt="icon"
                        className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex-shrink-0"
                      />
                      <span className="truncate">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[14px] truncate">
                    1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520
                  </td>
                  <td className="text-center text-[20px]">1</td>
                  <td className="px-6 py-4 text-center text-[20px]">2</td>
                  <td className="px-6 py-4 flex justify-center">
                    <div className="h-9 w-9 flex items-center justify-center rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </td>
                </tr>

                {/* data in Table */}
                <tr className="justify-center">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-5 truncate">
                      <img
                        src="https://www.eng.kmitl.ac.th/wp-content/uploads/2024/06/About-4-B.png"
                        alt="icon"
                        className="w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex-shrink-0"
                      />
                      <span className="truncate">สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-[14px] truncate">
                    1 ซอยฉลองกรุง 1 เขตลาดกระบัง อำเภอลาดกระบัง จังหวัดกรุงเทพมหานคร 10520
                  </td>
                  <td className="text-center text-[20px]">1</td>
                  <td className="px-6 py-4 text-center text-[20px]">2</td>
                  <td className="px-6 py-4 flex justify-center">
                    <div className="h-9 w-9 flex items-center justify-center rounded-md border border-[#2A3A50]">
                      <MoreHorizOutlinedIcon className="text-[#FAFAFA]" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </>
  );
}


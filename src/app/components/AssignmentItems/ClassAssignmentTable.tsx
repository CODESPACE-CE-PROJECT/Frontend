import React from "react";

import AssignmentItemBox from "./AssignmentItemBox";

export default function ClassAssignmentTable() {
  return (
    <>
      <div className="border border-[#94ABD7]">
        <table className="min-w-full bg-[#16233A] ">
          <thead className="text-lg bg-[#1F304B] h-12">
            <tr>
              <th className="border border-[#94ABD7] w-96">
                <span className=" font-normal">บท</span>
              </th>
              <th className="border border-[#94ABD7] px-3">
                <span className=" font-normal">อนุญาตให้ส่ง</span>
              </th>
              <th className="border border-[#94ABD7]">
                <span className="font-normal">รายการการบ้าน</span>
              </th>
              <th className="border border-[#94ABD7] px-3">
                <span className=" font-normal">คะแนน</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row1 */}
            <tr>
              <td className="border border-[#94ABD7] pl-3">
                1. ทดสอบเขียนโค้ด ครั้งที่ 1
              </td>
              <td className="border border-[#94ABD7] h-24">
                <h2 className="flex justify-center">
                  <span className="text-[#00DB32]">เปิด</span>
                </h2>
              </td>

              {/* homework box start*/}
              <td className="border border-[#94ABD7] h-24">
                <AssignmentItemBox />
              </td>
              {/* homework box end*/}
              <td className="border border-[#94ABD7] ">
                <h2 className="flex justify-center">
                  <span>2</span>
                  <span>{"/"}</span>
                  <span>10</span>
                </h2>
              </td>
            </tr>
            {/* row2 */}
            <tr>
              <td className="border border-[#94ABD7] pl-3">
                2. ทดสอบเขียนโค้ด ครั้งที่ 2
              </td>
              <td className="border border-[#94ABD7] h-24">
                <h2 className="flex justify-center">
                  <span className="text-[#FAFAFA]">ปิด</span>
                </h2>
              </td>
              {/* homework box start*/}
              <td className="border border-[#94ABD7] h-24">
                <AssignmentItemBox />
              </td>
              {/* homework box end*/}
              <td className="border border-[#94ABD7] ">
                <h2 className="flex justify-center">
                  <span>2</span>
                  <span>{"/"}</span>
                  <span>10</span>
                </h2>
              </td>
            </tr>
            {/* row3 */}
            <tr>
              <td className="border border-[#94ABD7] pl-3">
                3. ทดสอบเขียนโค้ด ครั้งที่ 3
              </td>
              <td className="border border-[#94ABD7] h-24">
                <h2 className="flex justify-center">
                  <span className="text-[#FE4E3C]">ไม่อนุญาตให้ส่ง</span>
                </h2>
              </td>
              {/* homework box start*/}
              <td className="border border-[#94ABD7] h-24">
                <AssignmentItemBox />
              </td>
              {/* homework box end*/}
              <td className="border border-[#94ABD7] ">
                <h2 className="flex justify-center">
                  <span>2</span>
                  <span>{"/"}</span>
                  <span>10</span>
                </h2>
              </td>
            </tr>
          </tbody>
          <tfoot className="text-lg bg-[#1F304B] h-12">
            <tr>
              <td colSpan={3} className=" border border-[#94ABD7]">
                <h1 className="flex justify-center">คะแนนรวม</h1>
              </td>
              <td className="border border-[#94ABD7]">
                <h2 className="flex justify-center">
                  <span>6</span>
                  <span>{"/"}</span>
                  <span>30</span>
                </h2>
              </td>
              <></>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

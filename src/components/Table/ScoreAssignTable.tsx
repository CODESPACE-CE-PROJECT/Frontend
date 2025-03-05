"use client";

import React from "react";
import { IAssignmentScore } from "@/types/assignment";

interface Props {
  assignments: IAssignmentScore["data"]; 
  assignmentLock: { [assignmentId: string]: boolean };
}

export default function ScoreTableTeacher({
  assignments,
  assignmentLock,
}: Props) {
  return (
    <>
      <div className="flex items-center rounded-lg pt-6 gap-x-4 justify-between ">
        <p className="flex text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-[968px] justify-center">
          แบบฝึกหัด
        </p>
        <div className="flex w-[140px] bg-[#161f2e] items-center justify-center text-lg py-3 rounded-md">
          สถานะ
        </div>
        <div className="flex w-[140px] text-white text-lg py-3 rounded-md bg-[#161f2e] text-center items-center justify-center">
          คะแนน
        </div>
      </div>
      {assignments.length > 0 ? (
        assignments.map(
          (assignment: IAssignmentScore["data"][number], index) => {
            const isLock = assignmentLock[assignment.assignmentId]; 
            return (
              <div
                key={assignment.assignmentId}
                className="flex items-center rounded-lg py-3 gap-x-4 justify-between "
              >
                <div className="flex w-[968px] text-lg items-center ml-2">
                  <p>{`${index + 1}. ${assignment.title}`}</p>
                </div>

                <div className="flex w-[140px] items-center justify-center text-lg">
                  <div
                    className={`flex w-[61px] h-[37px] py-4 px-3 border items-center justify-center rounded-md ${
                      isLock
                        ? " text-[#CED4DA] border-[#CED4DA]"
                        : " text-[#00DACC] border-[#00DACC]" 
                    }`}
                  >
                    {isLock ? "ปิด" : "เปิด"}{" "}
                  
                  </div>
                </div>

                <div className="flex w-[140px] text-lg text-center items-center justify-center">
                  <p>{assignment.scores[0]?.totalScore}</p> 
                </div>
              </div>
            );
          }
        )
      ) : (
        <div className="text-white text-lg px-8 py-4 text-center">
          ไม่มีข้อมูล
        </div>
      )}
    </>
  );
}

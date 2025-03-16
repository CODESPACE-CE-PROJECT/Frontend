"use client";

import React from "react";
import Link from "next/link";
import { IAssignmentScore } from "@/types/assignment";

interface Props {
  assignments: IAssignmentScore["data"];
  assignmentLock: { [assignmentId: string]: boolean };
  courseId: string;
}

export default function ScoreTableTeacher({ assignments, assignmentLock, courseId }: Props) {
  return (
    <>
      <table className="w-full mt-2 table-auto border-spacing-x-4 border-separate text-white" >
        <thead>
          <tr className="bg-[#161f2e] text-lg ">
            <th className="p-3 w-[968px] rounded-md text-center">แบบฝึกหัด</th>
            <th className="p-3 w-[200px] rounded-md text-center">สถานะ</th>
            <th className="p-3 w-[200px] rounded-md text-center">คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assignment: IAssignmentScore["data"][number], index) => {
              const isLock = assignmentLock[assignment.assignmentId];
              const basePath = assignment.type === "EXERCISE" ? "exercise" : "exam";

              return (
                <tr key={assignment.assignmentId} className="text-center border-b border-[#2d3748]">
                  <td className="p-3 text-left">
                    <Link
                      href={`/teacher/course/${courseId}/score/${basePath}/${assignment.assignmentId}`}
                      className="hover:underline"
                    >
                      {`${index + 1}. ${assignment.title}`}
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block w-[90px] py-2 border rounded-md ${isLock ? "text-[#CED4DA] border-[#CED4DA]" : "text-[#00DACC] border-[#00DACC]"}`}>
                      {isLock ? "ปิด" : "เปิด"}
                    </span>
                  </td>
                  <td className="p-3">{assignment.scores[0]?.totalScore}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3} className="p-3 text-center">ไม่มีข้อมูล</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
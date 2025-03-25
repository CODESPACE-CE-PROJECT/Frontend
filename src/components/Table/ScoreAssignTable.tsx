"use client";

import React from "react";
import Link from "next/link";
import { IAssignmentScore } from "@/types/assignment";
import { AssignmentType } from "@/enum/enum";

interface Props {
  assignments: IAssignmentScore[];
  courseId: string;
}

export default function ScoreTableTeacher({ assignments, courseId }: Props) {
  return (
    <>
      <table className="w-full mt-4 table-auto border-separate text-white" >
        <thead>
          <tr className="bg-[#161f2e] text-lg ">
            <th className="py-3 w-[968px] rounded-md text-center">{assignments[0]?.type === AssignmentType.EXERCISE ? 'แบบผึกหัด': 'การทดสอบ'}</th>
            <th className="py-3 w-[200px] rounded-md text-center">สถานะ</th>
            <th className="py-3 w-[200px] rounded-md text-center">คะแนน</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map((item, index) => {    
              const basePath = item.type === AssignmentType.EXERCISE ? "exercise" : "exam"
              return (
                <tr key={item.assignmentId} className="text-center border-b border-[#2d3748]">
                  <td className="p-3 text-left">
                    <Link
                      href={`/teacher/course/${courseId}/score/${basePath}/${item.assignmentId}`}
                      className="hover:underline"
                    >
                      {`${index + 1}. ${item.title}`}
                    </Link>
                  </td>
                  <td className="p-3">
                    <span className={`inline-block w-[90px] py-2 border rounded-md ${item.isLock ? "text-[#CED4DA] border-[#CED4DA]" : "text-[#00DACC] border-[#00DACC]"}`}>
                      {item.isLock ? "ปิด" : "เปิด"}
                    </span>
                  </td>
                  <td className="p-3">{item.totalScoreProblem}</td>
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
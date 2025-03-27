"use client";

import React from "react";
import { IAssignmentScore } from "@/types/assignment";

interface Props {
  assignment?: IAssignmentScore;
}

export default function ScoreUserTable({ assignment }: Props) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full table-auto border-separate">
        <thead>
          <tr className="bg-[#161f2e] text-white text-lg last:border-none">
            <th className="px-4 py-3 w-[708px]  rounded-xl text-center">ชื่อผู้เรียน</th>
            <th className="p-4 rounded-lg text-center">
              <div className="flex flex-col items-center">
                <span className="font-medium">ข้อย่อย</span>
                <div className="w-full flex flex-row  mt-2 justify-between">
                  {
                    Array.from({ length: 6 }, (_, index) => (
                      <span
                        key={`problem-${index}`}
                        className="w-5 rounded-md text-center"
                      >
                        {index + 1}
                      </span>
                    ))
                  }
                </div>
              </div>
            </th>
            <th className="p-3 w-[140px] rounded-xl text-center">รวม</th>
          </tr>
        </thead>

        <tbody>
          {assignment?.scores.map((item, idx) => (
            <tr key={item.username} className="text-start">
              <td className="pl-7 py-3">{`${idx + 1}. ${item.firstName} ${item.lastName}`}</td>
              <td className="text-center p-4">
                <div className="w-full flex flex-row justify-between">
                  {
                    Array.from({ length: 6 }, (_, index) => (
                      <span
                        key={`problem-${index}`}
                        className="w-5 rounded-md text-center"
                      >
                        {item.problems[index]?.score ?? '-'}
                      </span>
                    ))
                  }
                </div>
              </td>
              <td className="flex p-3 w-[140px] rounded-xl justify-center">{item.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

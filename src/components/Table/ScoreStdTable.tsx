"use client";

import React from "react";
import { IAssignmentScore } from "@/types/assignment";

interface Props {
  assignments: IAssignmentScore[];
}

export default function ScoreTableTeacher({ assignments }: Props) {
  const studentMap = new Map<
    string,
    {
      firstName: string;
      lastName: string;
      scores: { title: string; totalScore: number }[];
      totalSum: number;
    }
  >();

  assignments.forEach((assignment) => {
    assignment.scores.forEach((score) => {
      if (!studentMap.has(score.username)) {
        studentMap.set(score.username, {
          firstName: score.firstName,
          lastName: score.lastName,
          scores: [],
          totalSum: 0,
        });
      }
      const student = studentMap.get(score.username);
      if (student) {
        student.scores.push({
          title: assignment.title,
          totalScore: score.totalScore,
        });
        student.totalSum += score.totalScore;
      }
    });
  });

  return (
    <div>
      <table className="w-full border-separate mt-4">
        <thead>
          <tr className="bg-[#161f2e] text-white text-lg mb-2 w-[300px]">
            <th className="p-3 w-96 rounded-lg">ชื่อผู้เรียน</th>
            {assignments.map((assignment) => (
              <th
                key={assignment.assignmentId}
                className="p-3 w-60 rounded-xl"
              >
                {assignment.title}
              </th>
            ))}
            <th className="p-3 w-40 rounded-lg">รวม</th>
          </tr>
        </thead>
        <tbody>
          {[...studentMap.entries()].map(([username, student], index) => (
            <tr key={username} className="text-center">
              <td className="p-3 text-left">
                {index+1}. {student.firstName} {student.lastName}
              </td>
              {student.scores.map((score, index) => (
                <td key={index} className="p-3">
                  {score.totalScore}
                </td>
              ))}
              <td className="p-3">{student.totalSum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

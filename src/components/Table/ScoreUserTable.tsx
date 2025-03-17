"use client";

import React from "react";
import { IAssignmentScore } from "@/types/assignment";

interface Props {
  assignments: IAssignmentScore["data"];
  assignmentId: string;
}

export default function ScoreUserTable({ assignments, assignmentId }: Props) {
  const studentMap = new Map<
    string,
    {
      firstName: string;
      lastName: string;
      scores: {
        assignmentId: string;
        title: string;
        totalScore: number;
        problems: { problemId: string; score: number; status: string }[];
      }[];
      totalSum: number;
    }
  >();

  assignments.forEach((assignment) => {
    assignment.scores.forEach((score) => {
      const scoreWithAssignmentId = {
        assignmentId: assignment.assignmentId,
        title: assignment.title,
        ...score,
      };

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
        student.scores.push(scoreWithAssignmentId);
        student.totalSum += score.totalScore;
      }
    });
  });

  const filteredStudentMap = new Map(
    [...studentMap.entries()].filter(([_, student]) =>
      student.scores.some((score) => score.assignmentId === assignmentId)
    )
  );

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-2">
        <thead>
          <tr className="bg-[#161f2e] text-white text-lg">
            <th className="px-4 py-3 w-[708px]  rounded-xl text-center">ชื่อผู้เรียน</th>
            <th className="p-3 rounded-xl text-center">
              <div className="flex flex-col items-center">
                <span className="font-medium">ข้อย่อย</span>
                <div className="w-full flex flex-wrap justify-center">
                  {assignments
                    .filter((assignment) => assignment.assignmentId === assignmentId)
                    .map((assignment) => (
                      <div key={assignment.assignmentId} className="w-full flex justify-between">
                        {assignment.scores[0]?.problems.map((_, index) => (
                          <span
                            key={`problem-${assignment.assignmentId}-${index}`}
                            className="px-3 py-2 rounded-md text-center m-1"
                          >
                            {index + 1}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </th>
            <th className="p-3 w-[140px] rounded-xl text-center">รวม</th>
          </tr>
        </thead>

        <tbody>
          {[...filteredStudentMap.entries()].map(([username, student], idx) => (
            <tr key={username} className="text-start">
              <td className="pl-7 py-3">{`${idx + 1}. ${student.firstName} ${student.lastName}`}</td>
              <td className="text-center">
                <div className="w-full flex justify-between">
                  {student.scores
                    .filter((score) => score.assignmentId === assignmentId)
                    .map((score) =>
                      score.problems.map((problem, index) => (
                        <span
                          key={`problem-${score.assignmentId}-${problem.problemId}`}
                          className="px-7 py-2 rounded-md text-center"
                        >
                          {problem.score ?? 0}
                        </span>
                      ))
                    )}
                </div>
              </td>
              <td className="flex p-3 w-[140px] rounded-xl justify-center">{student.totalSum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

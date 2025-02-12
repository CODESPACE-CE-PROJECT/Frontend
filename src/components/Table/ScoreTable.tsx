"use client";

import React from "react";
import { IAssignment } from "@/types/assignment";

interface AssignmentItem {
  assignmentId: string;
  title: string;
  totalScore: number;
  problem?: { score: number }[];
}

interface Props {
  assignments: AssignmentItem[];
  isLoading: boolean;
  error: string;
}

export default function ScoreTable({ assignments, isLoading, error }: Props) {
  return (
    <>
      <div className="flex justify-between items-center rounded-lg mt-6">
        <p className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4">
          แบบฝึกหัด
        </p>
        <div className="flex w-36 text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center items-center justify-center">
          คะแนน
        </div>
      </div>

      {isLoading ? (
        <div className="text-white text-lg px-8 py-4 text-center">
          กำลังโหลดข้อมูล...
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg px-8 py-4 text-center">
          {error}
        </div>
      ) : assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div
            key={assignment.assignmentId}
            className="flex justify-between items-center rounded-lg space-y-4"
          >
            <div className="flex-1 text-white text-lg rounded-md text-start items-center px-5 py-3 mr-4">
              <p className="font-semibold">{`${index + 1}. ${
                assignment.title
              }`}</p>
            </div>
            <div className="flex w-36 text-white text-lg rounded-md text-center items-center justify-center px-4 py-3 ">
              <p>
                {assignment.totalScore} /{" "}
                {assignment.problem?.reduce(
                  (acc, problem) => acc + problem.score,
                  0
                ) ?? 0}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white text-lg px-8 py-4 text-center">
          ไม่มีข้อมูล
        </div>
      )}
    </>
  );
}

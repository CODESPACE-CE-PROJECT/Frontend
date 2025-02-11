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
            <div className="flex justify-between items-center rounded-lg pt-5">
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4">
                    แบบฝึกหัด
                </div>
                <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center flex items-center justify-center">
                    คะแนน
                </div>
            </div>

            {isLoading ? (
                <div className="text-white text-lg px-8 py-4 text-center">กำลังโหลดข้อมูล...</div>
            ) : error ? (
                <div className="text-red-500 text-lg px-8 py-4 text-center">{error}</div>
            ) : assignments.length > 0 ? (
                assignments.map((assignment, index) => (
                    <div key={assignment.assignmentId} className="flex justify-between items-center px-8 py-4 rounded-lg">
                        <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center  flex items-center gap-4">
                            <div className="font-semibold">{`${index + 1}. ${assignment.title}`}</div>
                        </div>
                        <div className="text-white text-lg px-4 py-3 rounded-md w-48  text-center ">
                            {assignment.totalScore} /{" "}
                            {assignment.problem?.reduce((acc, problem) => acc + problem.score, 0) ?? 0}
                        </div>

                    </div>
                ))
            ) : (
                <div className="text-white text-lg px-8 py-4 text-center">ไม่มีข้อมูล</div>
            )}
        </>
    );
}

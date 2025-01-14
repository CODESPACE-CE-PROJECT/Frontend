"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "../../../../services/assignment.service";
import { useRouter } from "next/navigation";

export default function Assignment() {
  const router = useRouter();
  const param = useParams<{courseId: string}>();
  const courseId = param.courseId

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        if (data?.data) {
          setAssignments(data.data.assignment);
        }
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* Header */}
      <div className="relative w-full flex">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            แบบฝึกหัด
          </h1>
        </div>
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] font-semibold text-lg py-4">
            การทดสอบ
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      {/* Table Header */}
      <div className="flex justify-between items-center px-8 rounded-lg pt-3">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4 w-1/2">
          การทดสอบ
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center mr-4 w-4/12">
          ข้อย่อย
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center ">
          คะแนน
        </div>
      </div>

      {/* Assignment List */}
      {assignments.map((assignment) => (
        <div
          key={assignment.assignmentId}
          className="flex justify-between items-center px-8 py-6 rounded-lg"
        >
          {/* Assignment Title */}
          <div className="text-white text-lg px-3 rounded-md flex text-start w-1/2 ml-3">
            {assignment.title}
          </div>

          {/* Problem Count (Box Style) */}
          <div className="flex gap-2 justify-start w-4/12 text-center">
            {assignment.problem.map((problem: any, index: number) => {
              const score = problem.score || 0;
              const maxScore = problem.score;
              const bgColor =
                problem.stateSubmission === "NOTSEND"
                  ? "bg-[#808080]"
                  : "bg-[#4CAF50]";
              const textColor =
                problem.stateSubmission === "NOTSEND"
                  ? "text-white"
                  : "text-white";

              return (
                <div
                  key={problem.problemId}
                  className={`${bgColor} ${textColor} flex flex-col items-center justify-center rounded-sm p-2 h-16 w-16 cursor-pointer`}
                  onClick={() =>
                    router.push(`/student/courses/${courseId}/assignment/${problem.problemId}`)
                  }
                >
                  <h1 className="space-x-1">
                    <span>ข้อ</span>
                    <span>{index + 1}</span>
                  </h1>
                  <h2>
                    <span>{score}</span>
                    <span>{"/"}</span>
                    <span>{maxScore}</span>
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Total Score */}
          <div className="text-white text-lg py-3 rounded-md w-48 text-center">
            {assignment.problem.length > 0
              ? assignment.problem.reduce(
                  (acc: number, curr: any) => acc + curr.score,
                  0
                )
              : 0}
          </div>
        </div>
      ))}
    </>
  );
}

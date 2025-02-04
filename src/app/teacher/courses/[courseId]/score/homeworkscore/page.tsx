"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAssignment } from "@/app/services/assignment.service";

export default function Score() {
  const params = useParams<{ courseId: string }>();
  const { courseId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [maxTotalScore, setMaxTotalScore] = useState<number>(0);

  useEffect(() => {
    const fetchAssignments = async () => {
      setIsLoading(true);
      if (courseId) {
        try {
          const data = await getAssignment(courseId);
          console.log(data); // Debugging log

          if (data && data.data && Array.isArray(data.data.assignment)) {
            // Filter assignments of type EXERCISE
            const exerciseAssignments = data.data.assignment.filter(
              (assignment: any) => assignment.type === "EXERCISE"
            );

            setAssignments(exerciseAssignments);

            // Calculate total score directly from assignments
            const overallTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: any) => acc + assignment.totalScore,
              0
            );

            setTotalScore(overallTotalScore);

            // Calculate the maximum total score (sum of all problem scores)
            const overallMaxTotalScore = exerciseAssignments.reduce(
              (acc: number, assignment: any) =>
                acc + assignment.problem.reduce((sum: number, problem: any) => sum + problem.score, 0),
              0
            );

            setMaxTotalScore(overallMaxTotalScore);
          } else {
            setError("Failed to fetch assignments or data is not in expected format.");
          }
        } catch (err) {
          setError("An error occurred while fetching assignments.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAssignments();
  }, [courseId]);

  return (
    <>
      <div className="text-3xl pl-10 pb-5 mt-6">คะแนน</div>

      <div className="relative w-full ">
        <div className="flex gap-12 pl-14">
          <Link href={`/student/courses/${courseId}/score/homeworkscore`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${
                window.location.pathname.includes("homeworkscore")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
              }`}
            >
              แบบฝึกหัด
            </h1>
          </Link>
          <Link href={`/student/courses/${courseId}/score/testscore`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${
                window.location.pathname.includes("testscore")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
              }`}
            >
              การทดสอบ
            </h1>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center px-8 rounded-lg py-7">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center mr-4">
          คะแนน
        </div>
      </div>

      {isLoading ? (
        <div className="text-white text-lg px-8 py-4 text-center">กำลังโหลดข้อมูล...</div>
      ) : error ? (
        <div className="text-red-500 text-lg px-8 py-4 text-center">{error}</div>
      ) : assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div key={index} className="flex justify-between items-center px-8 py-4 rounded-lg">
            <div className="text-white text-lg px-4 py-3 rounded-md flex-1 text-center mr-4 flex items-center gap-4">
              <div className="font-semibold">{`${index + 1}. ${assignment.title}`}</div>
            </div>
            <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4 ">
              {assignment.totalScore} /{" "}
              {assignment.problem.reduce((acc: number, problem: any) => acc + problem.score, 0)}
            </div>
          </div>
        ))
      ) : (
        <div className="text-white text-lg px-8 py-4 text-center">ไม่มีข้อมูล</div>
      )}

      <div className="flex justify-end px-8 py-4">
        <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-8">
          คะแนนรวม {totalScore} / {maxTotalScore}
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "../../../../../services/assignment.service";
import { getCoursesById } from "../../../../../services/announcement.service";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Assignment() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseDetails, setCourseDetails] = useState<any>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        if (data) {
          // Filter assignments to only include type "EXERCISE"
          const filteredAssignments = data.data.assignment.filter(
            (assignment: any) => assignment.type === "EXERCISE"
          );
          setAssignments(filteredAssignments);
        }

        const courseData = await getCoursesById(param.courseId);
        setCourseDetails(courseData.data);
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
      <div className="text-2xl pl-10 pb-5 mt-6">{courseDetails?.title}</div>

      <div className="relative w-full">
        <div className="flex gap-12 pl-14">
          <Link href={`/student/courses/${courseId}/assignment/homeworkassignment`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${
                window.location.pathname.includes("homeworkassignment")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
              }`}
            >
              แบบฝึกหัด
            </h1>
          </Link>
          <Link href={`/student/courses/${courseId}/assignment/testassignment`}>
            <h1
              className={`text-lg font-semibold cursor-pointer pb-2 ${
                window.location.pathname.includes("testassignment")
                  ? "text-white border-b-4 border-[#1E90FF]"
                  : "text-gray-400"
              }`}
            >
              การทดสอบ
            </h1>
          </Link>
        </div>
      </div>
      {/* Table Header */}
      <div className="flex justify-between items-center px-8 rounded-lg pt-3">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center mr-4 w-1/2">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center mr-4 w-4/12">
          ข้อย่อย
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] w-48 text-center">
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
                    router.push(
                      `/student/courses/${courseId}/assignment/homeworkassignment/${problem.problemId}`
                    )
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

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProblemById } from "../../../../../services/problem.service";
import { useDispatch } from "react-redux";
import { setIsCloseCourseNav } from "@/app/store/slices/courseNavSlice";
import Description from "@/app/components/Description";
import TextEditter from "@/app/components/TextEditter";
import TestCase from "@/app/components/TestCase";
import { getCoursesById } from "../../../../../services/announcement.service";
import { getAssignment } from "../../../../../services/assignment.service";

export default function AssignmentPage() {
  const params = useParams<{ courseId: string; problemId: string }>();
  const { problemId } = params;
  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const [problemDetails, setProblemDetails] = useState<any>(null);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsCloseCourseNav(true));

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const problemData = await getProblemById(problemId);
        setProblemDetails(problemData.data);

        const courseData = await getCoursesById(params.courseId);
        setCourseDetails(courseData.data);

        const assignment = await getAssignment(params.courseId);
        setAssignmentDetails(assignment.data);

      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [problemId, params.courseId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const courseTitle = courseDetails?.title || "N/A";
  const assignmentTitle = assignmentDetails?.assignment?.find(
    (assignment: any) => assignment.assignmentId === problemDetails?.assignmentId
  )?.title || "N/A";
  const problemTitle = problemDetails?.title || "N/A";

  return (
    <>
      <div className="text-white text-2xl ml-4 mb-5">
        {`${courseTitle} / ${assignmentTitle} / ${problemTitle}`}
      </div>

      <div className="flex flex-wrap gap-4 px-2 py-3 mb-5 ml-4 text-white">
  {assignmentDetails?.assignment[0]?.problem?.map((problem: any, index: number) => {
    // ตรวจสอบว่า problemId ตรงกับ problemDetails หรือไม่
    const isCurrentProblem = problem.problemId === problemDetails?.problemId;
    
    // กำหนดสีพื้นหลังแต่ละ box
    const bgColor = isCurrentProblem
      ? "bg-blue-500" // สีสำหรับ box ที่มี title
      : index % 2 === 0
      ? "bg-green-500" // สีสำหรับ index คู่
      : "bg-red-500"; // สีสำหรับ index คี่

    return (
      <div
        key={problem.problemId}
        className={`px-4 py-2 rounded-lg ${bgColor} text-center`}
        style={{ margin: "0.5rem" }} // เว้นระยะห่างแต่ละ box
      >
        {isCurrentProblem ? problemDetails?.title : `${index + 1}`} {/* แสดง title ถ้าเป็น problemId ปัจจุบัน */}
      </div>
    );
  })}
</div>


      <div className="flex flex-row">
        <div className="flex flex-col w-8/12 pl-4">
          <div>
            <Description />
          </div>
          <div className="pt-5">
            <TestCase />
          </div>
        </div>

        <div className="pr-4 ml-5">
          <TextEditter />
        </div>
      </div>
    </>
  );
}

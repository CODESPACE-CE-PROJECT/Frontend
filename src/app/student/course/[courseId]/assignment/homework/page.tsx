"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAssignment } from "@/actions/assignment";
import { getCoursesById } from "@/actions/announcement";
import Link from "next/link";
import { IAssignment } from "@/types/assignment"
import AssignmentTable from "@/components/Table/AssignmentTable";


export default function Assignment() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<IAssignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  


  useEffect(() => {
    
    const fetchAssignments = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        if (data) {
          const filteredAssignments = data.data.assignment.filter(
             (assignment: IAssignment["assignment"][number]) => assignment.type === "EXERCISE"
          );
    
          setAssignments({ assignment: filteredAssignments }); 
        }
    
       
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      }
      setLoading(false);
    };
    

    fetchAssignments();
  }, [courseId, param.courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      

      <div className="relative w-full">
        <div className="flex gap-12 pl-5 mt-5 ">
          <Link href={`/student/course/${courseId}/assignment/homework`}>
            <h1
              className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D] rounded-md ${
                window.location.pathname.includes("homework")
                  ? "text-white border-b-4 border-[#5572FA]"
                  : "text-white"
              }`}
            >
              แบบฝึกหัด
            </h1>
          </Link>
          <Link href={`/student/course/${courseId}/assignment/exam`}>
            <h1
              className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D] rounded-md ${
                window.location.pathname.includes("exam")
                  ? "text-white border-b-4 border-[#5572FA]"
                  : "text-white"
              }`}
            >
              การทดสอบ
            </h1>
          </Link>
        </div>
      </div>
      <div className="mt-4">
      {assignments && <AssignmentTable assignments={assignments} courseId={courseId} />}
      </div>
    </>
  );
}
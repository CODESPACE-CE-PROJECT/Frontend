"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "../../../../services/assignment.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Assignment() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
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
        if (data) {
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

  const getLinkClass = (path: string) =>
    window.location.pathname.includes(path)
      ? "text-white border-b-4 border-[#1E90FF]"
      : "text-gray-400";

  return (
    <>
      {/* Header */}
      <div className="text-2xl pl-10 pb-5 mt-6">
        คะแนน
      </div>

      <div className="relative w-full">
        <div className="flex gap-12 pl-14">
          <Link href={`/student/courses/${courseId}/assignment/homeworkassignment`}>
            <h1 className={`text-lg font-semibold cursor-pointer pb-2 ${getLinkClass("homeworkscore")}`}>
              แบบฝึกหัด
            </h1>
          </Link>
          <Link href={`/student/courses/${courseId}/assignment/testassignment`}>
            <h1 className={`text-lg font-semibold cursor-pointer pb-2 ${getLinkClass("testscore")}`}>
              การทดสอบ
            </h1>
          </Link>
        </div>
      </div>


    </>
  );
}

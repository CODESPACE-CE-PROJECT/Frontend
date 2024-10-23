"use client"; // Add this line at the very top

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AssignmentItemBox from "@/app/components/AssignmentItems/AssignmentItemBox";
import { getAssignment } from "../../../../services/user.service";

export default function Assignment() {
  const params = useParams();
  const courseId = params.id;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId as string);
        if (data?.data) {
          setAssignments(data.data);
        }
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    if (courseId) {
      fetchAssignments();
    }
  }, [courseId]);


  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            การบ้าน
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        <div className="border border-[#94ABD7]">
          <table className="min-w-full bg-[#16233A] ">
            <thead className="text-lg bg-[#1F304B] h-12">
              <tr>
                <th className="border border-[#94ABD7] w-96">
                  <span className="font-normal">บท</span>
                </th>
                <th className="border border-[#94ABD7] px-3">
                  <span className="font-normal">อนุญาตให้ส่ง</span>
                </th>
                <th className="border border-[#94ABD7]">
                  <span className="font-normal">รายการการบ้าน</span>
                </th>
                <th className="border border-[#94ABD7] px-3">
                  <span className="font-normal">คะแนน</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.assignmentId}>
                  <td className="border border-[#94ABD7] pl-3">
                    {assignment.title}
                  </td>
                  <td className="border border-[#94ABD7] h-24">
                    <h2 className="flex justify-center">
                      <span className={assignment.isLock ? "text-[#FE4E3C]" : "text-[#00DB32]"}>
                        {assignment.isLock ? "ไม่อนุญาตให้ส่ง" : "เปิด"}
                      </span>
                    </h2>
                  </td>

                  <td className="border border-[#94ABD7] h-24">
                    <div className="flex flex-row justify-center gap-x-4 px-5">
                      {Array.from({ length: assignment.problemQuantities }).map((_, index) => {
                        const problem = assignment.problem[index];
                        const score = problem ? problem.score : 0; 
                        const href = problem ? "/student/homeworkspace" : "#"; 
                        const bgColor = problem ? "#1E9733" : "#808080"; 

                        return (
                          <a
                            key={index}
                            href={href}
                            className={`bg-[${bgColor}] flex flex-col items-center justify-center rounded-sm p-2 h-16 w-16`}
                          >
                            <h1 className="space-x-1">
                              <span>ข้อ</span>
                              <span>{index + 1}</span>
                            </h1>
                            <h2>
                              <span>{score}</span>
                              <span>{"/"}</span>
                              <span>2</span> 
                            </h2>
                          </a>
                        );
                      })}
                    </div>
                  </td>

                  <td className="border border-[#94ABD7]">
                    <h2 className="flex justify-center">
                      {assignment.problem.length > 0 ? (
                        assignment.problem.map((problem: any) => (
                          <span key={problem.problemId}>
                            {problem.score} / {assignment.problemQuantities}
                          </span>
                        ))
                      ) : (
                        <span>0 / {assignment.problemQuantities}</span>
                      )}
                    </h2>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-lg bg-[#1F304B] h-12">
              <tr>
                <td colSpan={3} className="border border-[#94ABD7]">
                  <h1 className="flex justify-center">คะแนนรวม</h1>
                </td>
                <td className="border border-[#94ABD7]">
                  <h2 className="flex justify-center">
                    <span>testคะแนน</span>
                  </h2>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

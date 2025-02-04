"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAssignment } from "../../../../../services/assignment.service";
import { getCoursesById } from "../../../../../services/announcement.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setIsCloseCourseNav } from "@/app/store/slices/courseNavSlice";
import { createAssignment } from "../../../../../services/assignment.service"; // Import the API function

export default function Assignment() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states for creating assignment
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"EXERCISE" | "EXAMONSITE" | "EXAMONLINE">("EXERCISE");
  const [announceDate, setAnnounceDate] = useState("");
  const [startAt, setStartAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    dispatch(setIsCloseCourseNav(false));
    const fetchAssignments = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getAssignment(courseId);
        setAssignments(data?.data?.assignment || []);
        
        const courseData = await getCoursesById(param.courseId);
        setCourseDetails(courseData.data);
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
        setAssignments([]);
      }
      setLoading(false);
    };

    fetchAssignments();
  }, [courseId, dispatch]);

  const handleCreateAssignment = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = {
      title,
      type,
      announceDate,
      startAt,
      expireAt,
      courseId
    };

    try {
      const response = await createAssignment(formData); // เรียกใช้ service ที่สร้างไว้
      console.log("Assignment created successfully:", formData);
      // การกระทำอื่นๆ เช่น การปิด modal หรือการรีเฟรชรายการการบ้าน
    } catch (error) {
      setErrorMessage("ไม่สามารถสร้างการบ้านได้");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="text-2xl text-[#FAFAFA] pl-10 pb-5 mt-6">
        {courseDetails?.title}
      </div>

      {/* Header */}
      <div className="relative w-full flex justify-between items-center px-14">
        <div className="flex gap-12">
          <Link href={`/teacher/courses/${courseId}/assignment/homeworkassignment`}>
            <h1 className="text-lg font-semibold cursor-pointer pb-2 text-white">แบบฝึกหัด</h1>
          </Link>
          <Link href={`/teacher/courses/${courseId}/assignment/testassignment`}>
            <h1 className="text-lg font-semibold cursor-pointer pb-2 text-white">การทดสอบ</h1>
          </Link>
        </div>
        <button
          className="bg-[#5572FA] text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          สร้างแบบฝึกหัด/การทดสอบ
        </button>
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
        <div key={assignment.assignmentId} className="flex justify-between items-center px-8 py-6 rounded-lg">
          <div className="text-white text-lg px-3 rounded-md flex text-start w-1/2 ml-3">
            {assignment.title}
          </div>

          {/* Problems */}
          <div className="flex gap-2 justify-start w-4/12 text-center">
            {assignment.problem.map((problem: any, index: number) => {
              const score = problem.score || 0;
              const maxScore = problem.score;
              const bgColor = problem.stateSubmission === "NOTSEND" ? "bg-[#808080]" : "bg-[#4CAF50]";

              return (
                <div
                  key={problem.problemId}
                  className={`${bgColor} text-white flex flex-col items-center justify-center rounded-sm p-2 h-16 w-16 cursor-pointer`}
                  onClick={() =>
                    router.push(`/student/courses/${courseId}/assignment/homeworkassignment/${problem.problemId}`)
                  }
                >
                  <h1>
                    <span>ข้อ</span>
                    <span>{index + 1}</span>
                  </h1>
                  <h2>
                    <span>{score}</span>/<span>{maxScore}</span>
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Total Score */}
          <div className="text-white text-lg py-3 rounded-md w-48 text-center">
            {assignment.problem.reduce((acc: number, curr: any) => acc + curr.score, 0)}
          </div>
        </div>
      ))}

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[60rem] h-[30rem] relative ">
            {/* Close Modal Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-center text-black">
              สร้างแบบฝึกหัด/การทดสอบ
            </h2>

            <div className="mt-6 space-y-4">
              {/* Title */}
              <div className="flex flex-col">
                <label className="font-medium text-black">หัวข้อ <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="หัวข้อ"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="font-medium text-black">ประเภท <span className="text-red-500">*</span></label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={type}
                    onChange={(e) => setType(e.target.value as "EXERCISE" | "EXAMONSITE" | "EXAMONLINE")}
                  >
                    <option value="EXERCISE">แบบฝึกหัด</option>
                    <option value="EXAMONSITE">การทดสอบ</option>
                    <option value="EXAMONLINE">การทดสอบออนไลน์</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-black">วันเวลาแจ้งเตือน <span className="text-red-500">*</span></label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={announceDate}
                    onChange={(e) => setAnnounceDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Start & Expire Date */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="font-medium text-black">วันเวลาเริ่มต้น <span className="text-red-500">*</span></label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium text-black">วันเวลาสิ้นสุด <span className="text-red-500">*</span></label>
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    value={expireAt}
                    onChange={(e) => setExpireAt(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Button Controls */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="border-[#CED4DA] border px-6 py-2 rounded-md text-black"
                onClick={() => setIsModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-[#5572FA] text-white px-6 py-2 rounded-md"
                onClick={handleCreateAssignment} // Handle form submission
              >
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

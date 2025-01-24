"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getpeople } from "../../../../services/course.service";
import Image from "next/image";
import Profileuser from "../../../../assets/setting/Profileuser.svg";
import SearchIcon from "@mui/icons-material/Search";

export default function People() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;

  const [teacher, setTeacher] = useState<any | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getpeople(courseId);

        // ตรวจสอบข้อมูลที่ได้จาก API
        console.log("API Response:", data);

        const teacherData =
          data.data.courseTeacher && data.data.courseTeacher.length > 0
            ? data.data.courseTeacher[0].user
            : null;

        const studentData =
          data.data.courseStudent && data.data.courseStudent.length > 0
            ? data.data.courseStudent.map((student: any) => student.user)
            : [];

        setTeacher(teacherData);
        setStudents(studentData);
      } catch (err: any) {
        console.error("Error fetching people data:", err);
        setError(err.message);
      }
      setLoading(false);
    };
    fetchPeople();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            สมาชิก
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      <div className="flex items-center my-3 mx-8 px-4 py-3 space-x-4 w-auto rounded-md focus:border-[#1E90FF] duration-200 border border-[#2A3A50]">
          <SearchIcon />
          <input
            type="text"
            placeholder="ค้นหาชื่อ"
            className="bg-transparent text-white focus:outline-none placeholder:text-white w-full"
          />
      </div>

      <div className="flex justify-between items-center px-8 rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-2/3 text-center mr-4">
          ชื่อผู้เรียน
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-48 text-center mr-4">
          ประเภท
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-48 text-center">
          สถานะ
        </div>
      </div>

      {/* แสดงข้อมูลผู้สอน */}
      {teacher ? (
        <div className="flex justify-between items-center px-8 py-6 rounded-lg">
          <div className="flex text-white text-lg px-4 py-3 rounded-md text-center mr-4 w-2/3 space-x-4 items-center">
            <Image
              src={teacher.pictureUrl || Profileuser}
              alt="Profile"
              className="w-16 h-16 rounded-full"
              width={100}
              height={100}
            />
            <div className="flex flex-col text-left">
              <div className="font-semibold">
                {teacher.username || "ชื่อผู้ใช้งาน"}
              </div>
              <div className="text-sm text-gray-300">
                {teacher.email || "email@example.com"}
              </div>
            </div>
          </div>

          <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
            ผู้สอน
          </div>

          <div
            className={`flex text-white text-lg py-3 rounded-md border mx-6 w-36 text-center items-center justify-center ${
              teacher.isActived ? "border-[#00DACC]" : "border-[#FAFAFA]"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                teacher.isActived ? "bg-[#00DACC]" : "bg-[#FAFAFA]"
              }`}
            ></div>
            {teacher.isActived ? "ออนไลน์" : "ออฟไลน์"}
          </div>
        </div>
      ) : (
        <div>ไม่มีข้อมูลผู้สอน</div>
      )}

      {/* แสดงข้อมูลผู้เรียน */}
      {students.length > 0 ? (
        students.map((student, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-8 py-6 rounded-lg"
          >
            <div className="flex text-white text-lg px-4 py-3 rounded-md text-center mr-4 items-center w-2/3 space-x-4">
              <Image
                src={student.pictureUrl || Profileuser}
                alt="Profile"
                className="w-16 h-16 rounded-full"
                width={100}
                height={100}
              />
              <div className="flex flex-col text-left">
                <div className="font-semibold">
                  {student.username || "ชื่อผู้ใช้งาน"}
                </div>
                <div className="text-sm text-gray-300">
                  {student.email || "email@example.com"}
                </div>
              </div>
            </div>

            <div className="text-white text-lg px-4 py-3 rounded-md w-48 text-center mr-4">
              ผู้เรียน
            </div>

            <div
              className={`text-white text-lg py-3 rounded-md border w-36 mx-6 text-center flex items-center justify-center ${
                student.isActived ? "border-[#00DACC]" : "border-[#FAFAFA]"
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  student.isActived ? "bg-[#00DACC]" : "bg-[#FAFAFA]"
                }`}
              ></div>
              {student.isActived ? "ออนไลน์" : "ออฟไลน์"}
            </div>
          </div>
        ))
      ) : (
        <div>ไม่มีข้อมูลผู้เรียน</div>
      )}
    </>
  );
}

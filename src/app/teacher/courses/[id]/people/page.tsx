"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; // Import Image from next/image
import { getpeople } from "../../../../services/user.service";

export default function People() {
  const params = useParams();
  const courseId = params.id;

  const [teacher, setTeacher] = useState<any | null>(null); // Update to handle full teacher object
  const [students, setStudents] = useState<any[]>([]); // Update to handle full student objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Course ID:", courseId);
    const fetchPeople = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getpeople(courseId as string);
        console.log("Fetched Data:", data); // Log the full response for debugging

        // Check if teacher data exists and retrieve the username and picture
        const teacherData = data.data.teacher && data.data.teacher.length > 0
          ? data.data.teacher[0].user // Access the first teacher's full object
          : null; // If no teacher, return null

        // Check if student data exists and retrieve the usernames and pictures
        const studentData = data.data.student && data.data.student.length > 0
          ? data.data.student.map((student: any) => student.user) // Access each student's full object
          : [];

        console.log("Teacher Data:", teacherData); // Log teacher data
        console.log("Student Data:", studentData); // Log student data

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

      {/* Teacher Section */}
      <div className="flex flex-col px-20 py-5">
        <div className="border-b border-gray pb-2 mb-4 text-white text-2xl font-semibold">
          อาจารย์ผู้สอน
        </div>
        {teacher ? (
          <div className="flex items-center space-x-4 text-white mb-6 shadow-xl pl-5">
            <Image
              className="w-20 h-20 rounded-full"
              src={teacher.picture} // Access teacher picture
              alt="Teacher Profile"
              width={80}
              height={80}
            />
            <div className="text-lg font-semibold">{teacher.username}</div>
          </div>
        ) : (
          <div className="text-lg text-white">No teacher found</div>
        )}

        {/* Members Section */}
        <div className="border-b border-gray pb-2 mb-4 text-white text-2xl font-semibold">
          สมาชิก
        </div>
        <div className="flex flex-col space-y-6 text-white">
          {students.length > 0 ? (
            students.map((student, index) => (
              <div key={index} className="flex items-center space-x-4 shadow-xl pl-5">
                <Image
                  className="w-20 h-20 rounded-full"
                  src={student.picture} // Access student picture
                  alt="Student Profile"
                  width={80}
                  height={80}
                />
                <div className="text-lg font-semibold">{student.username}</div>
              </div>
            ))
          ) : (
            <div className="text-lg text-white">No students found</div>
          )}
        </div>
      </div>
    </>
  );
}

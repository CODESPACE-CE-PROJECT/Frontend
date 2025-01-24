"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";
import { getCoursesById } from "../../../../services/announcement.service";
import Link from "next/link";

const AssignBox = ({
  title,
  announceDate,
  expireAt,
  username,
  courseId,  // Add courseId here
}: {
  title: string;
  announceDate: string;
  expireAt: string;
  username: string;
  courseId: string;  // Declare courseId type
}) => (
  <div className="bg-[#16233A] rounded-md border-2 border-slate-900 w-full">
    <div className="border-[#131823] border-b-2">
      <div className="flex flex-row items-center gap-x-5 font-light text-lg mx-8 my-4">
        <AccountCircleIcon className="text-5xl" />
        <h1>{username}</h1>
        <h2>{new Date(announceDate).toLocaleString()}</h2>
      </div>
      <div className="mx-8 mb-5 space-y-5 p-5 bg-[#2C3A4E] rounded">
        <div className="font-bold text-wrap">{title}</div>
        <div className="text-sm text-wrap justify-between flex">
          วันสิ้นสุดการบ้าน {new Date(expireAt).toLocaleString()}
          <Link href={`/student/courses/${courseId}/assignment/homeworkassignment`}>
            <button className="text-sm rounded">ดูงานที่ได้รับมอบหมาย</button>
          </Link>
        </div>
      </div>
    </div>
    <div className="flex flex-row items-center gap-x-5 mx-8 my-3">
      <PersonIcon className="text-3xl" />
      <h1 className="text-lg">Reply</h1>
    </div>
  </div>
);


export default function General() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param?.courseId;

  const [assignments, setAssignments] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("Unknown");
  const [courseDetails, setCourseDetails] = useState<any>(null); // Added courseDetails
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;

      setLoading(true);
      setError(null);
      try {
        const data = await getCoursesById(courseId);
        console.log("Fetched data:", data);

        if (data?.data) {
          setAssignments(data.data.assignment || []);
          setUsername(data.data.username || "Unknown");
          setCourseDetails({
            title: data.data.title,
          });
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      }
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <div className="relative w-full">
      {/* Display course title */}
      <div className="flex pl-10">
        <h1 className="z-10 py-4 text-2xl">{courseDetails?.title || "Loading..."}</h1>
      </div>

      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : assignments && assignments.length > 0 ? (
         assignments.map((assignment) => (
  <AssignBox
    key={assignment.assignmentId}
    title={assignment.title}
    announceDate={assignment.announceDate}
    expireAt={assignment.expireAt}
    username={username}
    courseId={courseId}  // Pass the courseId here
  />
))
        ) : (
          <div className="text-center text-gray-500">No assignments found.</div>
        )}
      </div>
    </div>
  );
}

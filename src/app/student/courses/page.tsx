"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getAllCourseById } from "../../services/course.service";
import CourseBg from "@/app/assets/CoursesAssets/CourseBg.png";
import UserProfile from "@/app/assets/CoursesAssets/UserProfile.svg";
import { useDispatch } from "react-redux";
import { setIsCloseCourseNav } from "@/app/store/slices/courseNavSlice";

export default function Courses() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(setIsCloseCourseNav(true)); // Set the visibility to 'off'

    const fetchCourses = async () => {
      try {
        const response = await getAllCourseById();
        console.log("Courses fetched:", response.data); // Log the response data
        if (response && response.data) {
          setCourses(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const id = "your-id-here"; // Make sure to replace this with the actual ID
    if (id) {
      fetchCourses();
    } else {
      console.error("ID is required to fetch courses");
    }
  }, [dispatch]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/student/courses/${courseId}/general`);
  };

  return (
    <div className="flex flex-col text-[#FAFAFA] m-14 w-full">
      <h1 className="text-3xl font-medium mb-6">คอร์สเรียน</h1>
      <div className="flex flex-row flex-wrap gap-5">
        {courses.length > 0 ? (
          courses.map((course: any) => (
            <div
              key={course.courseId}
              onClick={() => handleCourseClick(course.courseId)}
              className="relative flex flex-col text-[#0B111B] cursor-pointer w-auto h-auto"
            >
              {course.backgroundUrl ? (
                <Image
                  className="self-center rounded-t-2xl w-full min-h-48"
                  src={course.backgroundUrl}
                  alt={course.title}
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  className="self-center rounded-t-2xl w-full min-h-48"
                  src={CourseBg}
                  alt={course.title}
                  width={100}
                  height={100}
                />
              )}
              <Image
                className="absolute inset-y-32 left-4 w-16 rounded-full border-[#FAFAFA] border-2 "
                src={UserProfile}
                alt={course.title}
              />
              <div className="px-7 py-5 bg-[#FAFAFA] rounded-b-2xl pt-10 h-full">
                <h1 className="w-48 text-xl font-semibold text-wrap">
                  {course.title}
                </h1>
                <h2 className="text-sm">จิระศักดิ์ สิทธิกร</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p>
        )}
      </div>
    </div>
  );
}

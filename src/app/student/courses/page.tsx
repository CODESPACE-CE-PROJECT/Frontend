"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCourse } from "../../services/course.service";
import CourseBg from "@/app/assets/CoursesAssets/CourseBg.png";
import UserProfile from "@/app/assets/CoursesAssets/UserProfile.svg";
import { useDispatch } from "react-redux";
import { setIsCloseCourseNav } from "@/app/store/slices/courseNavSlice";
import Image from "next/image";
import Profiler from "@/app/assets/setting/profileuser.svg";
import CoursesMap from "@/app/components/CoursesItems/CoursesMap";

export default function Courses() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(setIsCloseCourseNav(true)); // Set the visibility to 'off'

    const fetchCourses = async () => {
      try {
        const response = await getAllCourse();
        if (response && response.data) {
          setCourses(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [dispatch]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/student/courses/${courseId}/general`);
  };

  return (
    <div className="flex flex-col text-[#FAFAFA] w-full">
      <h1 className="text-3xl font-medium mb-6">คอร์สเรียน</h1>
      <CoursesMap />
    </div>
  );
}

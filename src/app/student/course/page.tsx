"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCourse } from "@/actions/course";
import CourseBg from "@/app/assets/CoursesAssets/CourseBg.png";
import UserProfile from "@/app/assets/CoursesAssets/UserProfile.svg";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Profiler from "@/app/assets/setting/profileuser.svg";
import CoursesCard from "@/components/Courses/CoursesCard";

export default function Courses() {
  const router = useRouter();
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {

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
  }, []);

  return (
    <div className="flex flex-col text-[#FAFAFA] w-full">
      <CoursesCard />
    </div>
  );
}
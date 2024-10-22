"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image"; 
import { getAllCourseById } from "../../services/user.service";
import Class102 from "@/app/assets/CoursesAssets/Class102.svg"; 

export default function Courses() {
  const router = useRouter(); 
  const [courses, setCourses] = useState([]);  
  
  useEffect(() => {
    const fetchCourses = async (id: string) => {
      try {
        const response = await getAllCourseById(id); 
        console.log(response.data); 
        if (response && response.data) {
          setCourses(response.data || []); 
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const id = 'your-id-here'; // Replace with the actual logic to get the ID
    if (id) {
      fetchCourses(id);
    } else {
      console.error("ID is required to fetch courses");
    }
  }, []);

  
  const handleCourseClick = (id: string) => {
    router.push(`/student/courses/${id}/general`); 
  };

  return (
    <div className="flex flex-col text-[#FAFAFA] m-14 w-full">
      <h1 className="text-lg font-medium mb-6">คอร์สเรียน</h1>
      <div className="flex flex-row flex-wrap gap-5">
        {courses.length > 0 ? (
          courses.map((course: any) => (
            <div
              key={course.courseId} 
              onClick={() => handleCourseClick(course.courseId)} 
              className="flex flex-col items-center bg-[#16233A] hover:bg-[#2C3A4E] cursor-pointer rounded-md space-y-3 px-7 py-5 w-80 h-auto"
            >
              
              {course.backgroundUrl ? (
                <img className="w-20 h-20" src={course.backgroundUrl} alt={course.title} />
              ) : (
                <Image className="w-20 h-20" src={Class102} alt={course.title} />
              )}
              <h2 className="font-medium text-wrap text-xl">{course.title}</h2>
              <p className="line-clamp-2 text-sm">{course.description}</p>
            </div>
          ))
        ) : (
          <p>No courses available at the moment.</p> 
        )}
      </div>
    </div>
  );
}

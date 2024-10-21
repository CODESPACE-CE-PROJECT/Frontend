"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAllCourseById } from "../../../services/user.service";

export default function CourseDetail() {
  const [course, setCourse] = useState<any | null>(null); // Store course details
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Get the course ID from the dynamic route

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getAllCourseById(id);
        setCourse(response.data); // Set course details
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Could not fetch course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex flex-col text-[#FAFAFA] m-14 min-w-screen">
      <h1 className="text-lg font-medium mb-6">{course.title}</h1>
      <p>{course.description}</p>
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        onClick={() => router.push("/teacher/courses")}
      >
        Back to Courses
      </button>
    </div>
  );
}

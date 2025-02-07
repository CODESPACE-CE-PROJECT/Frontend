import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getAllCourse } from "@/actions/course";
import CourseBg from "@/assets/CoursesAssets/CourseBg.png";
import Profiler from "@/assets/setting/profileuser.svg";

export default function CoursesCard() {
  const router = useRouter();
  const pathname = usePathname();
  
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

  const handleCourseClick = (courseId?: string) => {
    if (!courseId) {
      console.error("Course ID is missing");
      return;
    }
  
    const currentPath = pathname;
    const role = currentPath.startsWith("/teacher") ? "teacher" : "student";
  
    router.push(`/${role}/course/${courseId}/general`);
  };
  

  return (
    <div className="flex flex-row flex-wrap gap-5">
      {courses.length > 0 ? (
        courses.map((course: any) => (
          <div
            key={course.courseId}
            onClick={() => handleCourseClick(course.courseId)}
            className="relative flex flex-col text-[#0B111B] cursor-pointer w-auto h-[332px] border-[#fafafa] border-2 rounded-2xl"
          >
            {course.backgroundUrl ? (
              <Image
                className="self-center rounded-t-2xl w-[280px] min-h-48 object-cover"
                src={course.backgroundUrl}
                alt={course.title}
                width={100}
                height={100}
                priority={true}
              />
            ) : (
              <Image
                className="self-center rounded-t-2xl w-[280px] min-h-48  object-cover"
                src={CourseBg}
                alt={course.title}
                width={100}
                height={100}
                priority={true}
              />
            )}
            <Image
              className="absolute inset-y-[9.75rem] left-4 w-16 rounded-full border-[#FAFAFA] border-2 "
              src={course.user.pictureUrl || Profiler}
              alt={course.title}
              width={100}
              height={100}
              priority={true}
            />
            <div className="px-7 py-2 bg-[#FAFAFA] rounded-b-xl pt-10 h-full">
              <h1 className="w-48 text-xl font-semibold text-wrap">
                {course.title}
              </h1>
              <h2 className="text-sm">
                {course.user.firstName} {course.user.lastName}
              </h2>
            </div>
          </div>
        ))
      ) : (
        <p>No courses available at the moment.</p>
      )}
    </div>
  );
}

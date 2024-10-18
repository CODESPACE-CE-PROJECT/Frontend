"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createCourse, getAllCourseById } from "../../services/user.service"; // Assuming this gets all courses

export default function Courses() {
  const [showCreateClass, setShowCreateClass] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("/default-profile.png");
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [courses, setCourses] = useState<any[]>([]); // Store the list of courses
  const router = useRouter();
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourseById(); // Fetch courses
        setCourses(response.data); // Set the courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []); // Run once on component mount

  const toggleCreateClass = () => {
    setShowCreateClass(!showCreateClass);
    if (showCreateClass) {
      setCourseName("");
      setDescription("");
      setProfileImage("/default-profile.png"); 
      setErrorMessage(""); 
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); 

    try {
      const newCourse = await createCourse({
        title: courseName,
        description: description,
      });

      // Add the new course to the list
      setCourses((prevCourses) => [...prevCourses, newCourse]); // Update the courses list
      toggleCreateClass();
      
    } catch (error: any) {
      if (error.response?.data?.message === "Over limit Create Course Per Teacher 3") {
        setErrorMessage("คุณไม่สามารถสร้างชั้นเรียนเกิน 3 ชั้นเรียนได้"); 
      } else {
        console.error("Error creating course:", error);
        setErrorMessage("ไม่สามารถสร้างชั้นเรียนซ้ำได้"); 
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (id: string) => {
    router.push(`/teacher/courses/${id}`); 
  };

  return (
    <div className="bg-gray-900 min-h-screen p-10">
      <div className="flex justify-between items-center text-[#FAFAFA] mb-8">
        <h1 className="text-2xl font-semibold">คอร์สเรียน</h1>
        {!showCreateClass && (
          <button
            onClick={toggleCreateClass}
            className="bg-[#30363D80] hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center space-x-3 transition duration-300 ease-in-out"
          >
            <PersonAddIcon />
            <div className="">สร้างชั้นเรียน</div>
          </button>
        )}
      </div>

      {showCreateClass && (
        <div className="flex justify-center items-center">
          <div className="bg-[#16233A] p-6 rounded-lg shadow-lg text-white w-6/12">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="block mb-2">ปรับแต่งรูปภาพ:</label>
                <div className="relative flex flex-col items-center justify-center h-32 bg-[#2A3A50] rounded-lg cursor-pointer">
                  <Image
                    src={profileImage}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                  <div className="flex flex-col items-center">
                    <AddPhotoAlternateIcon className="text-white mb-1" />
                    <span className="text-white">เลือกรูปภาพ</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2">ชื่อชั้นเรียน:</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">รายละเอียด:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none"
                  required
                ></textarea>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                  onClick={toggleCreateClass}
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  {loading ? "กำลังสร้าง..." : "สร้าง"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display the list of courses */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#FAFAFA]">คอร์สที่คุณสร้าง</h2>
        <div className="flex flex-col space-y-4 mt-4">
          {courses.map((course) => (
            <div
              key={course.id} // Ensure the course object has an 'id' field
              className="bg-[#2A3A50] p-4 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out"
              onClick={() => handleCourseClick(course.id)}
            >
              <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createCourse, getAllCourseById } from "../../services/user.service"; // Assuming this gets all courses

import Class102 from "@/app/assets/CoursesAssets/Class102.svg";

export default function Courses() {
  const [showCreateClass, setShowCreateClass] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>(Class102);
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
      setProfileImage("");
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
      if (
        error.response?.data?.message ===
        "Over limit Create Course Per Teacher 3"
      ) {
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
    <div className="flex flex-col text-[#FAFAFA] m-14 min-w-screen">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-medium mb-6">คอร์สเรียน</h1>
        {!showCreateClass && (
          <button
            onClick={toggleCreateClass}
            className="bg-[#30363D80] hover:bg-blue-700 text-white py-2 px-4 rounded-lg border-solid border-[1px] border-[#7A7A7A] flex items-center space-x-3 transition duration-300 ease-in-out"
          >
            <PersonAddIcon />
            <div className="">สร้างชั้นเรียน</div>
          </button>
        )}
      </div>

      {showCreateClass && (
        <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#16233A] p-6 rounded-lg shadow-lg text-white w-11/12 max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <fieldset className="flex flex-col">
                <legend className="block mb-2">ปรับแต่งรูปภาพ:</legend>
                <div
                  className="relative flex flex-col items-center justify-center h-32 bg-[#2A3A50] rounded-lg cursor-pointer"
                  role="button"
                  aria-label="เลือกรูปภาพ"
                >
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <AddPhotoAlternateIcon className="text-white mb-1" />
                      <span className="text-white">เลือกรูปภาพ</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    aria-hidden="true"
                  />
                </div>
              </fieldset>

              <div>
                <label htmlFor="courseName" className="block mb-2">
                  ชื่อชั้นเรียน:
                </label>
                <input
                  id="courseName"
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2">
                  รายละเอียด:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
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
                  className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {loading ? "กำลังสร้าง..." : "สร้าง"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display the list of courses */}

      <div className="flex flex-row flex-wrap gap-5">
        {courses.map((course) => (
          <div
            key={course.id} // Ensure the course object has an 'id' field
            className="flex flex-col items-center bg-[#16233A] hover:bg-[#2C3A4E] cursor-pointer rounded-md space-y-3 px-7 py-5 w-80 h-auto"
            onClick={() => handleCourseClick(course.id)}
          >
            <Image className="w-20" src={profileImage} alt={course.title} />
            <h2 className="font-medium text-wrap text-xl">{course.title}</h2>
            <p className="line-clamp-2 text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

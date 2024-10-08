"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after course creation
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

export default function Courses() {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Use router for navigation

  // Toggle the visibility of the create class form
  const toggleCreateClass = () => {
    setShowCreateClass(!showCreateClass);
  };

  // Handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  // Handle form submission to create a course
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      title: courseName,
      description: description,
    };

    setLoading(true);

    try {
      // Call the API to create the course
      const response = await createCourse(formData);
      alert("Course created successfully!");

      // Redirect to the created course page
      const courseId = response.id; // Assuming the backend returns the course ID
      router.push(`/courses/${courseId}`);

      // Reset form
      setCourseName("");
      setDescription("");
      setShowCreateClass(false); // Hide form after creating the course
    } catch (error) {
      alert("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to call the backend API for creating the course
  const createCourse = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/course`,
        {
          title: formData.title,
          description: formData.description,
        },
        {
          headers: {
            "Content-Type": "application/json", // Sending data as JSON
          },
        }
      );
      return response.data; // Assuming backend response contains the course ID
    } catch (error) {
      console.error("Error creating course:", error.response || error.message);
      throw error;
    }
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
            <div className="mt-2">สร้างชั้นเรียน</div>
          </button>
        )}
      </div>

      {/* Create Class Form */}
      {showCreateClass && (
        <div className="flex justify-center items-center">
          <div className="bg-[#16233A] p-6 rounded-lg shadow-lg text-white w-6/12">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              
              {/* Image Upload Section */}
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

              {/* Course Name Input */}
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

              {/* Course Description Input */}
              <div>
                <label className="block mb-2">รายละเอียด:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none"
                  required
                ></textarea>
              </div>

              {/* Form Buttons */}
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
    </div>
  );
}

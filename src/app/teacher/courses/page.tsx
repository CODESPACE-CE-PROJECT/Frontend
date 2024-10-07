"use client";

import React, { useState } from "react";
import Image from "next/image";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Courses() {
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  // Function to toggle the visibility of the form
  const toggleCreateClass = () => {
    setShowCreateClass(!showCreateClass);
  };

  // Function to handle image upload and preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
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
        <div className="bg-[#16233A] p-6 rounded-lg shadow-lg mt-6 text-white">
          <h2 className="text-xl font-semibold mb-4">สร้างชั้นเรียนใหม่</h2>
          <form className="flex flex-col space-y-4">
            
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
                  onChange={handleImageUpload} // Function to handle image upload
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
                className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-2">รายละเอียด:</label>
              <textarea 
                className="w-full px-4 py-2 bg-[#2A3A50] text-white rounded-lg focus:outline-none"
              ></textarea>
            </div>

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
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
              >
                สร้าง
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

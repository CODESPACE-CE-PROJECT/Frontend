"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "../../../src/app/assets/setting/profile.svg";
import { getProfile } from "../services/user.service";

export default function Setting() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    school: "",
    email: "",
    newPassword: "**********************",
    confirmPassword: "**********************",
    gender: "",
    profilePicture: profile,
  });

  const handleEditClick = () => setIsEditing(!isEditing);
  const handleProfileChangeClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancel = () => setIsEditing(false);
  const handleSave = () => setIsEditing(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile();
        setProfileData({
          username: response.data.username,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          school: "KMITL",
          email: response.data.email,
          newPassword: "**********************",
          confirmPassword: "**********************",
          gender: response.data.gender,
          profilePicture: response.data.picture,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 min-h-screen bg-[#0F172A]">
     
      <div className="w-full md:w-1/3 flex flex-col">
        <h2 className="text-3xl text-white mb-6 font-bold">โปรไฟล์</h2>
        <div className="rounded-lg p-6 flex flex-col bg-[#16233A] shadow-lg border border-[#1E293B] h-10/12 space-y-8">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="flex items-center mb-6">
                <Image
                  src={profileData.profilePicture !== "" ? profileData.profilePicture : profile}
                  className="w-36 h-36 rounded-full border-4 border-[#3b4f61] shadow-lg object-cover"
                  width={144}
                  height={144}
                  alt="Profile Picture"
                />
                <div className="ml-4">
                  <h1 className="text-3xl font-bold mb-2 text-white">{profileData.username}</h1>
                  <p className="text-gray-400">{profileData.email}</p>
                  <button
                    onClick={handleEditClick}
                    className={`text-white mt-3 py-2 px-4 rounded-md font-semibold text-lg transition-colors duration-300 shadow-md ${
                      isEditing ? "bg-[#0099FF] hover:bg-[#007bb5]" : "bg-[#475766] hover:bg-[#1f3a47]"
                    }`}
                  >
                    {isEditing ? "เปลี่ยนโปรไฟล์" : "แก้ไขโปรไฟล์"}
                  </button>
                </div>
              </div>

        
              <div className="flex flex-col text-white space-y-8 ">
                <ProfileField label="ชื่อผู้ใช้งาน" name="username" value={profileData.username} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="ชื่อจริง" name="firstName" value={profileData.firstName} isEditing={isEditing} onChange={handleChange} />
                <ProfileField label="นามสกุล" name="lastName" value={profileData.lastName} isEditing={isEditing} onChange={handleChange} />
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-medium text-gray-300">เพศ:</label>
                  <div className="flex items-center space-x-4">
                    <GenderRadio value="male" checked={profileData.gender === "MALE"} onChange={handleChange} />
                    <GenderRadio value="female" checked={profileData.gender === "FEMALE"} onChange={handleChange} />
                    <GenderRadio value="other" checked={profileData.gender === "other"} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

     
      <div className="flex flex-col w-full md:w-2/3 gap-6">
        {loading ? (
          <>
            <p className="text-3xl text-white font-bold">ช่องทางติดต่อ</p>
            <SkeletonField />
            <p className="text-3xl text-white font-bold">รีเซ็ตรหัสผ่าน</p>
            <SkeletonField />
          
          </>
        ) : (
          <>
            <ContactSection profileData={profileData} isEditing={isEditing} handleChange={handleChange} />
            <ResetPasswordSection profileData={profileData} isEditing={isEditing} handleChange={handleChange} />
            {isEditing && (
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-[#F5F5F5] text-black rounded-md hover:bg-[#2c4a5b] transition-colors duration-300"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  className="py-2 px-4 bg-[#0099FF] text-white rounded-md hover:bg-[#007bb5] transition-colors duration-300"
                >
                  บันทึก
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

const ProfileField = ({ label, name, value, isEditing, onChange }:any) => (
  <div className="flex items-center">
    <span className="font-medium w-32 text-gray-300">{label}:</span>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="pl-5 py-3 w-full text-white bg-[#2A3A50] rounded-md border border-gray-300 shadow-inner"
      />
    ) : (
      <div className="pl-3">{value}</div>
    )}
  </div>
);

const GenderRadio = ({ value, checked, onChange }:any) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="gender"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <div className={`w-5 h-5 flex items-center justify-center border-2 rounded-full ${checked ? "bg-[#15A7D5] border-transparent" : "border-[#15A7D5]"}`}>
      {checked && <div className="w-2 h-2 bg-[#2A3A50] rounded-full"></div>}
    </div>
    <span className="text-white">{value === "male" ? "ชาย" : value === "female" ? "หญิง" : "อื่นๆ"}</span>
  </label>
);

const ContactSection = ({ profileData, isEditing, handleChange }:any) => (
  <>
    <h2 className="text-3xl text-white font-bold">ช่องทางติดต่อ</h2>
    <div className="bg-[#16233A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#1E293B] space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">โรงเรียน/สถาบัน</h2>
        {isEditing ? (
          <input
            type="text"
            name="school"
            value={profileData.school}
            onChange={handleChange}
            className="pl-5 py-4 text-white bg-[#2A3A50] w-full rounded-md shadow-inner"
          />
        ) : (
          <p className="text-gray-400">{profileData.school}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">อีเมล</h2>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="pl-5 py-4 text-white bg-[#2A3A50] w-full rounded-md shadow-inner"
          />
        ) : (
          <p className="text-gray-400">{profileData.email}</p>
        )}
      </div>
    </div>
  </>
);

const ResetPasswordSection = ({ profileData, isEditing, handleChange }:any) => (
  <>
    <h2 className="text-3xl text-white">รีเซ็ตรหัสผ่าน</h2>
    <div className="bg-[#16233A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#1E293B]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">รหัสผ่านใหม่</h2>
        {isEditing ? (
          <input
            type="password"
            name="newPassword"
            value={profileData.newPassword}
            onChange={handleChange}
            className="pl-5 py-4 text-white bg-[#2A3A50] w-full rounded-md shadow-inner"
          />
        ) : (
          <p className="text-gray-400">{profileData.newPassword}</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">ยืนยันรหัสผ่าน</h2>
        {isEditing ? (
          <input
            type="password"
            name="confirmPassword"
            value={profileData.confirmPassword}
            onChange={handleChange}
            className="pl-5 py-4 text-white bg-[#2A3A50] w-full rounded-md shadow-inner"
          />
        ) : (
          <p className="text-gray-400">{profileData.confirmPassword}</p>
        )}
      </div>
    </div>
  </>
);

const SkeletonLoader = () => (
  <div className="animate-pulse flex items-center space-x-6 p-6 bg-gray-200 rounded-lg shadow-md h-full">
    <div className="rounded-full bg-gray-300 w-24 h-24"></div>
    <div className="flex-1 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-4/5"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
);


const SkeletonField = () => (
  <div className="animate-pulse bg-[#16233A] rounded-md mb-4 h-full overflow-hidden shadow-md flex flex-col justify-center items-center p-4">
    <div className="h-5/6 w-full bg-gray-300 rounded-md mb-2"></div>
    
  </div>
);



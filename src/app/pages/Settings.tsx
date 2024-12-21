"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Profileuser from "../../../src/app/assets/setting/profileuser.svg";
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
    role: "",
    profilePicture: Profileuser,
  });

  const handleEditClick = () => setIsEditing(!isEditing);
  const handleProfileChangeClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e: any) => {
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
          role: response.data.role,
          profilePicture: response.data.picture || Profileuser, // Use default if no picture
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="gap-10 p-8 h-full w-full">
      <div>
        <h2 className="text-3xl text-white mb-8 font-bold">โปรไฟล์</h2>
        <div className="rounded-lg p-8 flex justify-center items-start shadow-lg space-x-8 w-full mx-auto">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="flex flex-row h-full w-full mx-48">

                {/* profile */}
                <div className="flex flex-col items-center justify w-1/5 ">
                  <div className="w-48 h-48 rounded-full border-4 border-[#3b4f61] shadow-lg overflow-hidden">
                    <Image src={profileData.profilePicture} alt="Profile" width={192} height={192} className="object-cover" />
                  </div>
                  <button
                    onClick={handleEditClick}
                    className={`text-white py-2 px-6 rounded-md font-semibold text-lg transition-colors duration-300 shadow-md mt-6 border border-[#2A3A50]`}
                  >
                   เปลี่ยนโปรไฟล์
                  </button>
                </div>

                <div className="flex flex-col w-full">

                  {/* setting */}
                  <div className="flex flex-col text-white space-y-4 w-full pt-5 ml-7">
                    <h1 className="text-4xl font-bold">{profileData.username}</h1>
                    <p className="text-lg text-gray-400">{profileData.email}</p>
                    <p className="text-lg pb-5">{profileData.role} สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>

                    <div className="flex flex-col space-y-6 pt-5 pb-5">
                      <div className="flex justify-between space-x-6 ">
                        <ProfileField label="ชื่อผู้ใช้งาน" name="username" value={profileData.username} isEditing={isEditing} onChange={handleChange} />
                        <ProfileField label="อีเมล" name="email" value={profileData.email} isEditing={isEditing} onChange={handleChange} />
                      </div>

                      <div className="flex justify-between space-x-6  ">
                        <ProfileField label="ชื่อจริง" name="firstName" value={profileData.firstName} isEditing={isEditing} onChange={handleChange} />
                        <ProfileField label="นามสกุล" name="lastName" value={profileData.lastName} isEditing={isEditing} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 mt-7 w-full ">
                      <label className="text-lg font-medium text-gray-300">เพศ:</label>
                      <div className="flex items-center space-x-6">
                        <GenderRadio value="male" checked={profileData.gender === "MALE"} onChange={handleChange} />
                        <GenderRadio value="female" checked={profileData.gender === "FEMALE"} onChange={handleChange} />
                        <GenderRadio value="other" checked={profileData.gender === "other"} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  {/* botton */}
                  <div className=" flex justify-end space-x-4 mt-40">
                    <button
                      onClick={handleSave} // หรือฟังก์ชันอื่นๆ ตามต้องการ
                      className="text-white py-2 px-6 rounded-md font-semibold text-lg transition-colors duration-300 shadow-md  border  border-[#2A3A50]"
                    >
                     เปลี่ยนรหัสผ่าน
                    </button>
                    <button
                      onClick={handleSave} // หรือฟังก์ชันที่เกี่ยวข้องกับการเปลี่ยนรหัสผ่าน
                      className="text-white py-2 px-6 rounded-md font-semibold text-lg transition-colors duration-300 shadow-md bg-[#5572FA] "
                    >
                       แก้ไขข้อมูล 
                    </button>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>

      </div>
    </div>

  );
}

const ProfileField = ({ label, name, value, isEditing, onChange }: any) => (
  <div className="flex flex-col items-start space-y-1 w-full">
    <span className="font-medium text-gray-300">{label}:</span>
    {isEditing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="pl-5 py-3 w-full text-white bg-[#2A3A50] rounded-md border border-gray-300 shadow-inner"
      />
    ) : (
      <div className="pl-3 text-white border border-[#2A3A50] rounded-md py-3 w-full">{value}</div>
    )}
  </div>
);

const GenderRadio = ({ value, checked, onChange }: any) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input
      type="radio"
      name="gender"
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <div className={`w-6 h-6 flex items-center justify-center border-2 rounded-full ${checked ? "bg-[#15A7D5] border-transparent" : "border-[#15A7D5]"}`}>
      {checked && <div className="w-3 h-3 bg-[#2A3A50] rounded-full"></div>}
    </div>
    <span className="text-white">{value === "male" ? "ชาย" : value === "female" ? "หญิง" : "อื่นๆ"}</span>
  </label>
);

const SkeletonLoader = () => (
  <div className="animate-pulse flex flex-col space-y-6">
    <div className="h-48 bg-gray-600 rounded-full"></div>
    <div className="h-10 bg-gray-600 rounded w-2/3"></div>
    <div className="h-8 bg-gray-600 rounded w-1/2"></div>
    <div className="h-10 bg-gray-600 rounded w-1/4"></div>
    <div className="h-10 bg-gray-600 rounded w-1/3"></div>
  </div>
);

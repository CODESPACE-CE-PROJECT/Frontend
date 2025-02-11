"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IProfile } from "@/types/user";
import { Role, Gender } from "@/enum/enum";
import { editProfile, uploadProfilePicture, getProfile } from "@/actions/user";
import { getAvatar } from "@/utils/gender.util";
import TextProfileField from "@/components/Input/TextField/TextProfileField";
import GenderRadio from "@/components/Input/GenderRadio";
import { Loading } from "@/components/Loading/Loading";

export default function Setting() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [editData, setEditData] = useState<IProfile | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IProfile = await getProfile();
        setProfileData({
          ...response,
          IpAddress: response.IpAddress || "-",
        });

        setEditData({
          ...response,
          IpAddress: response.IpAddress || "-",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = async () => {
    if (isEditing && isUpdate && editData) {
      try {
        const response: IProfile = await editProfile(editData);
        setProfileData((prev) => ({
          ...prev,
          ...response,
        }));
        setIsUpdate(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleFileChange = async (e: any) => {
    const file: File = e.target.files[0];
    if (file) {
      await uploadProfilePicture(file);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      router.push("/student/profile/update-password");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name in Gender ? "gender" : name]: value,
      };
    });
    setIsUpdate(true);
  };

  return (
    <div className="gap-10 p-8 h-full w-full">
      <div>
        
        <div className="rounded-lg p-8 flex justify-center items-start shadow-lg space-x-8 w-full mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <Loading className="size-20" />
            </div>
          ) : (
            <div className="flex flex-row h-full w-full mx-48">
              {/* Profile Picture */}
              <div className="flex flex-col items-center w-1/5">
                <div className="w-48 h-48 rounded-full border-4 border-[#3b4f61] shadow-lg overflow-hidden">
                  <Image
                    src={
                      profileData?.pictureUrl ||
                      getAvatar(profileData?.gender ?? Gender.OTHER)
                    }
                    alt="Profile"
                    width={100}
                    height={100}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="text-white px-5 py-3 rounded-md font-semibold text-lg transition-colors duration-300 shadow-md mt-6 border border-[#2A3A50] cursor-pointer hover:bg-[#3f5161]"
                >
                  <p>เปลี่ยนรูปโปรไฟล์</p>
                  <input type="file" id="fileInput" onInput={handleFileChange} style={{ display: "none" }} accept="image/png, image/jpg"
                  />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex flex-col w-full">
                <div className="flex flex-col text-white space-y-2 w-full pt-5 ml-7">
                  <h1 className="text-4xl font-bold">{`${profileData?.firstName} ${profileData?.lastName}`}</h1>
                  <p className="text-lg text-gray-400">{profileData?.email}</p>
                  <div className="flex flex-row items-center gap-x-4">
                    <p className="text-lg pb-5">
                      {profileData?.role === Role.STUDENT ? "ผู้เรียน" : ""}
                    </p>
                    <div className="bg-[#FAFAFA] size-2 rounded-full mb-5" />
                    <p className="text-lg pb-5">{profileData?.school.schoolName}</p>
                  </div>

                  <TextProfileField label="IP" name="IpAddress" value={editData?.IpAddress || ""} isEditing={false} onChange={handleChange}
                  />

                  <div className="flex flex-col space-y-6 pt-5 pb-5">
                    <div className="flex justify-between space-x-6">
                      <TextProfileField label="ชื่อผู้ใช้งาน" name="username" value={editData?.username || ""} isEditing={isEditing} onChange={handleChange}
                      />
                      <TextProfileField label="อีเมล" name="email" value={editData?.email || ""} isEditing={isEditing} onChange={handleChange}
                      />
                    </div>

                    <div className="flex justify-between space-x-6">
                      <TextProfileField label="ชื่อจริง" name="firstName" value={editData?.firstName || ""} isEditing={isEditing} onChange={handleChange}
                      />
                      <TextProfileField label="นามสกุล" name="lastName" value={editData?.lastName || ""} isEditing={isEditing} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mt-7 w-full">
                    <label className="text-lg font-medium text-gray-300">เพศ:</label>
                    <div className="flex items-center space-x-6">
                      <GenderRadio value={Gender.MALE} checked={editData?.gender === Gender.MALE} onChange={handleChange} disable={!isEditing} />
                      <GenderRadio value={Gender.FEMALE} checked={editData?.gender === Gender.FEMALE} onChange={handleChange} disable={!isEditing} />
                      <GenderRadio value={Gender.OTHER} checked={editData?.gender === Gender.OTHER} onChange={handleChange} disable={!isEditing} />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-40">
                  <button onClick={handleCancel} className="text-white py-2 px-6 rounded-md font-semibold text-lg shadow-md border border-[#2A3A50]">
                    {isEditing ? "ยกเลิก" : "เปลี่ยนรหัสผ่าน"}
                  </button>
                  <button onClick={handleEditClick} className="text-white py-2 px-6 rounded-md font-semibold text-lg shadow-md bg-[#5572FA]">
                    {isEditing ? "บันทึก" : "แก้ไขข้อมูล"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

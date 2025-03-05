"use client"; // Add this at the top of the file

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CourseBg from "@/assets/CoursesAssets/CourseBg.png";
import { useParams } from "next/navigation";
import { getCoursesById, editCourse, deleteCoursesById } from "@/actions/course";
import { TopNav } from "@/components/Navbar/TopNav";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { Loading } from "@/components/Loading/Loading";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";

interface ICourseDetails {
  title: string;
  description: string;
  backgroundUrl?: string;
}

export default function Setting() {
  const param = useParams<{ courseId: string }>();
  const courseId = param?.courseId;
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [courseDetails, setCourseDetails] = useState<ICourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<ICourseDetails | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      setLoading(true);
      setError(null);
      try {
        const profile: IProfile = await getProfile();
        setProfile(profile);
        const response = await getCoursesById(courseId);
        
        if (response?.data) {
          setCourseDetails(response.data);
          setEditData({
            title: response.data.title || "",
            description: response.data.description || "",
          });
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred while fetching data.");
      }
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

  const handleEditClick = async () => {
    if (!editData || !courseId) return;

    const id = notify(NotifyType.LOADING, "กำลังบันทึกการแก้ไข...");
    
    if (id) {
      try {
        const formData = new FormData();
        formData.append("title", editData.title);
        formData.append("description", editData.description);
        if (imageFile) {
          formData.append("picture", imageFile);
        }
  
        const updatedCourse = await editCourse(courseId, formData);
        setCourseDetails((prev) => ({ ...prev!, ...updatedCourse }));
  
        updateNotify(id, NotifyType.SUCCESS, "บันทึกการแก้ไขสำเร็จ!");
      } catch (error) {
        console.error("Error updating course:", error);
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการบันทึกการแก้ไข");
      }
    }
  };

  const handleDeleteClick = async () => {
    if (!courseId) return;

    const id = notify(NotifyType.LOADING, "กำลังลบคอร์สเรียน...");

    if (id) {
      try {
        await deleteCoursesById(courseId);
        updateNotify(id, NotifyType.SUCCESS, "ลบคอร์สเรียนสำเร็จ!");
        // Redirect to the course list page after deletion
        window.location.href = "/teacher/course";
        
      } catch (error) {
        console.error("Error deleting course:", error);
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการลบคอร์สเรียน");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEditData((prev) => ({ ...prev!, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setImageFile(file);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <>
          <TopNav
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            role={profile?.role}
            gender={profile?.gender}
          >
            <p>ตั้งค่า</p>
          </TopNav>

          <div className="justify-self-center mt-6">
            <div className="flex flex-row justify-center items-center space-x-16 mb-80">
              <div className="items-center justify-items-center space-y-5">
                <Image
                  className="self-center rounded-2xl w-[25rem] min-h-48 max-h-64 object-cover"
                  src={previewImage || courseDetails?.backgroundUrl || CourseBg}
                  alt={courseDetails?.title || "course"}
                  width={500}
                  height={500}
                  priority={true}
                />
                <button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="font-semibold border-[1px] border-[#2A3A50] rounded-xl px-4 py-3"
                >
                  <p>เลือกรูปภาพพื้นหลังของคอร์สเรียน</p>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/png, image/jpg"
                  />
                </button>
              </div>

              <div className="space-y-3">
                <div>ชื่อชั้นเรียน</div>
                <input
                  id="title"
                  type="text"
                  value={editData?.title ?? ""}
                  placeholder="ชื่อชั้นเรียน"
                  onChange={handleChange}
                  className="w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent py-2 px-4"
                  required
                />
                <div>รายละเอียด</div>
                <textarea
                  id="description"
                  value={editData?.description ?? ""}
                  placeholder="รายละเอียด"
                  onChange={handleChange}
                  className="min-h-28 max-h-48 w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-transparent py-2 px-4"
                  maxLength={200}
                />
                <div className="text-right text-xs">
                  {editData?.description?.length || 0}/200
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-self-end space-x-4">
              <button
                onClick={handleDeleteClick}
                className="text-[#EF4343] border-[1px] border-[#EF4343] rounded-xl px-8 py-4 hover:bg-[#151920]"
              >
                ลบคอร์สเรียน
              </button>
              <ConfirmButton
                onClick={handleEditClick}
                className="bg-[#5572FA] rounded-xl px-8 py-4"
              >
                บันทึกการแก้ไข
              </ConfirmButton>
            </div>
          </div>
        </>
      )}
    </>
  );
}

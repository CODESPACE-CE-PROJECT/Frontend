"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CourseBg from "@/assets/CoursesAssets/CourseBg.png";
import { useParams } from "next/navigation";
import {
  getCoursesById,
  editCourse,
  deleteCoursesById,
} from "@/actions/course";
import { TopNav } from "@/components/Navbar/TopNav";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { Loading } from "@/components/Loading/Loading";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import { CancelButton } from "@/components/Button/CancelButton";
import { DeleteCourseModal } from "@/components/Modals/DeleteCoursModal";
import { ICourse } from "@/types/course";

interface ICourseDetails {
  title: string;
  description: string;
  backgroundUrl?: string;
}

export default function Setting() {
  const param = useParams<{ courseId: string }>();
  const courseId = param?.courseId;
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [courseDetails, setCourseDetails] = useState<ICourseDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editData, setEditData] = useState<ICourseDetails | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      setLoading(true);
      setError(null);
      try {
        const profile: IProfile = await getProfile();
        setProfile(profile);
        console.log("Course ID:", courseId);

        const response: ICourse  = await getCoursesById(courseId);
        console.log("Course API response:", response.title);

        if (response) {
          setCourseDetails(response);
          setEditData({
            title: response.title || "",
            description: response.description || "",
            backgroundUrl: response.backgroundUrl || "",
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
    if (!courseDetails || !courseId) return;

    const id = notify(NotifyType.LOADING, "กำลังบันทึกการแก้ไข...");

    if (id) {
      try {
        const formData = new FormData();
        formData.append("title", courseDetails.title);
        formData.append("description", courseDetails.description);
        if (imageFile) {
          formData.append("picture", imageFile);
        }

        const updatedCourse = await editCourse(courseId, formData);

        setCourseDetails((prev) => ({
          ...prev!,
          ...updatedCourse,
          backgroundUrl: imageFile
            ? updatedCourse.backgroundUrl
            : prev!.backgroundUrl,
        }));

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
    setCourseDetails((prev) => ({
      ...prev!,
      [id]: value,
    }));
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
                  className="font-semibold border-[1px] border-[#2A3A50]  px-4 py-3 rounded-md"
                >
                  <p>เลือกรูปภาพพื้นหลังของคอร์สเรียน</p>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    />
                </button>
              </div>
              

              <div className="space-y-3">
                <div>ชื่อชั้นเรียน</div>
                <input
                  id="title"
                  value={courseDetails?.title || ""}
                  className="w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm bg-transparent py-2 px-4"
                  onChange={handleChange}
                />
                <div>รายละเอียด</div>

                <textarea
                  id="description"
                  value={courseDetails?.description || ""}
                  onChange={handleChange}
                  className="min-h-28 max-h-48 w-[32vw] border-[1px] border-[#2A3A50] rounded-lg shadow-sm bg-transparent py-2 px-4"
                  maxLength={200}
                />
                <div className="text-right text-xs">
                  {courseDetails?.description?.length || 0}/200
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-self-end space-x-4">
              <CancelButton
                onClick={() => setIsModalOpen(true)}
                className="text-red-l border-red-l  px-8 py-4 hover:bg-red-600 hover:text-white"
              >
                ลบคอร์สเรียน
              </CancelButton>
              <ConfirmButton
                onClick={handleEditClick}
                className="bg-[#5572FA]  px-8 py-4"
              >
                บันทึกการแก้ไข
              </ConfirmButton>
            </div>

            <DeleteCourseModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDeleteClick}
            />
          </div>
        </>
      )}
    </>
  );
}

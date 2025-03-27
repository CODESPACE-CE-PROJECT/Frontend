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
import { TextArea } from "@/components/Input/TextArea";
import { TextField } from "@/components/Input/TextField/TextField";
import { Label } from "@/components/Input/Label";
import { useRouter } from "next/navigation"

interface ICourseDetails {
  title: string;
  description: string;
  backgroundUrl?: string;
}

export default function Setting() {
  const param = useParams<{ courseId: string }>();
  const courseId = param?.courseId;
  const router = useRouter();
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState<boolean>(true);
  const [updateForm, setUpdateForm] = useState<ICourseDetails>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile)

      const response: ICourse = await getCoursesById(courseId);
      setUpdateForm({
        title: response.title || "",
        description: response.description || "",
        backgroundUrl: response.backgroundUrl || "",
      });
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

  const handleEditClick = async () => {
    const id = notify(NotifyType.LOADING, "กำลังบันทึกการแก้ไข...");

    if (id && updateForm) {
        const formData = new FormData();
        formData.append("title", updateForm.title);
        formData.append("description", updateForm.description);
        if (imageFile) {
          formData.append("picture", imageFile);
        }

        const {status} = await editCourse(courseId, formData);
        if (status === 200) {
          updateNotify(id, NotifyType.SUCCESS, "บันทึกการแก้ไขสำเร็จ!");
          router.push("/teacher/course");
        }else{
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        }
    }
  };

  const handleDeleteClick = async () => {
    const id = notify(NotifyType.LOADING, "กำลังลบคอร์สเรียน...");
    if (id) {
        const {status} = await deleteCoursesById(courseId);
        if(status === 200){
          updateNotify(id, NotifyType.SUCCESS, "ลบคอร์สเรียนสำเร็จ!");
          router.push("/teacher/course");
        }else{
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการลบคอร์สเรียน"); 
        }
    }
  };

  const handleChange = (
    value: string | number,
    name: string,
  ) => {
    setUpdateForm((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [name]: value,
      }
    });
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

          <div className="flex flex-row justify-start mb-80 mt-6 gap-x-20">
            <div className="flex flex-col items-start justify-start space-y-5 w-full">
              <Image
                className="rounded-2xl w-full min-h-48 max-h-64 object-cover"
                src={previewImage || updateForm?.backgroundUrl || CourseBg}
                alt={updateForm?.title || "course"}
                width={500}
                height={500}
                priority={true}
              />
              <button
                onClick={() => document.getElementById("fileInput")?.click()}
                className="font-semibold border-[1px] border-[#2A3A50]  px-4 py-3 rounded-md w-full"
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

            <div className="flex flex-col items-start justify-start h-full gap-y-3 w-full">
              <Label text="ชื่อคอร์สเรียน" isRequired={true} />
              <TextField
                name="title"
                value={updateForm?.title}
                className="w-full border-[#2A3A50]  bg-transparent"
                onChange={handleChange}
              />
              <Label text="คำอธิบาย" isRequired={false} />
              <TextArea
                name="description"
                value={updateForm?.description}
                onChange={handleChange}
                className="min-h-28 max-h-48 w-full border-[#2A3A50]  bg-transparent"
              />
              <div className="text-right text-xs self-end">
                {updateForm?.description?.length || 0}/200
              </div>
            </div>
          </div>

          <div className="flex flex-row self-end space-x-4">
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
        </>
      )}
    </>
  );
}

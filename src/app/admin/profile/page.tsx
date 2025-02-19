"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IProfile } from "@/types/user";
import { Role, Gender, NotifyType } from "@/enum/enum";
import { editProfile, uploadProfilePicture, getProfile } from "@/actions/user";
import { getAvatar } from "@/utils/gender.util";
import TextProfileField from "@/components/Input/TextField/TextProfileField";
import GenderRadio from "@/components/Input/GenderRadio";
import { Loading } from "@/components/Loading/Loading";
import { TopNav } from "@/components/Navbar/TopNav";
import { CancelButton } from "@/components/Button/CancelButton";
import CircleIcon from "@mui/icons-material/Circle";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { notify, updateNotify } from "@/utils/toast.util";

export default function Setting() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [editData, setEditData] = useState<IProfile | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: IProfile = await getProfile();
        setProfile({
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
    if (!isUpdate) {
      setIsEditing(true)
    }
    if (isEditing && isUpdate && editData) {
      const id = notify(NotifyType.LOADING, 'กำลังแก้ไขข้อมูล')
      const { status } = await editProfile(editData);
      if (id) {
        if (status === 200) {
          const profile = await getProfile()
          setProfile(profile)
          updateNotify(id, NotifyType.SUCCESS, 'แก้ไขข้อมูลสำเร็จ')
          setIsEditing((prev) => !prev)
          setIsUpdate(false);
        } else if (status === 406) {
          updateNotify(id, NotifyType.ERROR, 'มีอีเมลนี้อยู่ในระบบแล้ว')
        }
        else {
          updateNotify(id, NotifyType.ERROR, 'เกิดข้อผิดผลาดในการแก้ไขข้อมูล')
        }
      }
    }
  };

  const handleFileChange = async (e: any) => {
    const file: File = e.target.files[0];
    if (file) {
      const id = notify(NotifyType.LOADING, "กำลังแก้ไขรูปภาพโปรไฟล์")
      const { status } = await uploadProfilePicture(file);
      if (id) {
        if (status === 200) {
          updateNotify(id, NotifyType.SUCCESS, 'แก้ไขรูปภาพสำเร็จ')
          const profile = await getProfile()
          setProfile(profile)
        } else {
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการแก้ไขรูปภาพ")
        }
      }
    }
  };

  const handleCancelOrUpdatePassword = () => {
    if (isEditing) {
      setEditData(profile)
      setIsEditing(false);
      setIsUpdate(false)
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
    isLoading ? (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <Loading className="size-20" />
      </div>
    ) : (
      <div className="flex flex-col w-full p-10">
        <TopNav
          disableNotification={false}
          imageUrl={profile?.pictureUrl}
          role={profile?.role}
        >
          <p>โปรไฟล์</p>
        </TopNav>

        <div className="flex flex-row mt-6 justify-center items-center gap-x-14 px-60 h-full">
          <div className="flex flex-col items-center gap-5 w-1/3 self-start">
            <Image
              src={
                profile?.pictureUrl ||
                getAvatar(profile?.gender ?? Gender.OTHER)
              }
              alt="Profile"
              width={100}
              height={100}
              priority
              className="object-cover size-48 rounded-full"
            />

            <CancelButton
              onClick={() => document.getElementById("fileInput")?.click()}
              className="hover:bg-gray-600">
              <p>เปลี่ยนโปรไฟล์</p>
              <input type="file" id="fileInput" onInput={handleFileChange} style={{ display: "none" }} accept="image/png, image/jpg" />
            </CancelButton>
          </div>

          <div className="flex flex-col justify-between items-start h-full w-full">
            <div className="w-full mt-6">
              <div className="flex flex-col gap-y-3">
                <p className="font-semibold text-4xl">{profile?.firstName} {profile?.lastName}</p>
                <p className="text-lg">{profile?.email}</p>
                <div className="flex flex-row gap-x-4 items-center text-lg">
                  <p>ผู้ดูแลระบบ</p>
                  <CircleIcon fontSize="inherit" />
                  <p>CODE SPACE</p>
                </div>
              </div>

              <div className="flex flex-col gap-y-4 w-full mt-10">
                <TextProfileField label="IP" name="ip" value={profile?.IpAddress} isEditing={isEditing} onChange={handleChange} />
                <div className="flex flex-row items-center gap-x-4">
                  <TextProfileField label="ชื่อผู้ใช้งาน" name="username" value={profile?.username} isEditing={isEditing} onChange={handleChange} />
                  <TextProfileField label="อีเมล" name="email" value={editData?.email} isEditing={isEditing} onChange={handleChange} />
                </div>

                <div className="flex flex-row items-center gap-x-4">
                  <TextProfileField label="ชื่อ" name="firstName" value={editData?.firstName} isEditing={isEditing} onChange={handleChange} />
                  <TextProfileField label="นามสกุล" name="lastName" value={editData?.lastName} isEditing={isEditing} onChange={handleChange} />
                </div>

                <div className="flex flex-row items-center w-full my-4">
                  <label className="mr-4">เพศ</label>
                  <GenderRadio value={Gender.MALE} checked={editData?.gender === Gender.MALE} onChange={handleChange} disable={!isEditing} />
                  <GenderRadio value={Gender.FEMALE} checked={editData?.gender === Gender.FEMALE} onChange={handleChange} disable={!isEditing} />
                  <GenderRadio value={Gender.OTHER} checked={editData?.gender === Gender.OTHER} onChange={handleChange} disable={!isEditing} />
                </div>
              </div>
            </div>
            <div className="flex flex-row self-end gap-x-4">
              <CancelButton className="hover:bg-gray-600" onClick={handleCancelOrUpdatePassword}>
                <p>{isEditing ? "ยกเลิก" : "เปลี่ยนรหัสผ่าน"}</p>
              </CancelButton>

              <ConfirmButton className="px-11" onClick={handleEditClick} disabled={isEditing && !isUpdate}>
                <p>{isEditing ? "บันทึก" : "แก้ไขข้อมูล"}</p>
              </ConfirmButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
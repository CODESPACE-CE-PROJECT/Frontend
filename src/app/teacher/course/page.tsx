"use client";

import { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { createCourse, getAllCourse } from "@/actions/course";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CreateCourseModal } from "@/components/Modals/CreateCourseModal";
import { CoursesCard } from "@/components/Courses/CoursesCard";
import { Loading } from "@/components/Loading/Loading";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { ICourse } from "@/types/course";
import { TopNav } from "@/components/Navbar/TopNav";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    picture: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getAllCourse();
      if (status === 200) setCourses(data);

      const userProfile: IProfile = await getProfile();
      setProfile(userProfile);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleInputChange = (value: string | number, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;
    setImageFile(file);
  };

  const handleSubmit = async () => {

    const id = notify(NotifyType.LOADING, "กำลังสร้างคอร์สเรียน");

    const courseData = new FormData();
    courseData.append("title", formData.title);
    courseData.append("description", formData.description);
    if (imageFile) courseData.append("picture", imageFile);

    const {status, data} = await createCourse(courseData);
    console.log(status)
    console.log(data)
    if(id){
      if(status === 201){
        updateNotify(id, NotifyType.SUCCESS, "สร้างคอร์สเรียนสำเร็จ!");
        const { status, data } = await getAllCourse();
        if (status === 200) setCourses(data);
        setIsModalOpen(false);
      } else if (status === 400 && data.message.includes("Over limit Create Course Per Teacher")) {
        updateNotify(id, NotifyType.ERROR, `ไม่สามารถสร้างชั้นคอร์สเรียนเกินที่กำหนดได้`);
      } else if (status === 400 && data.message === "Duplicate course") {
        updateNotify(id, NotifyType.ERROR, "มีชื่อคอร์สนี้อยู่ในระบบแล้ว");
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการสร้างคอร์สเรียน");
      }
    }
  };


  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <div className="flex flex-col p-10 w-screen h-screen">
          <TopNav
            className="mb-6"
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            gender={profile?.gender}
            role={profile?.role}
          >
            <p className="p-[10px]">คอร์สเรียน</p>
          </TopNav>

          <ConfirmButton
            onClick={() => setIsModalOpen(true)}
            className="self-end px-3"
          >
            <div className="flex flex-row items-center gap-x-4">
              <PersonAddIcon />
              <p>สร้างคอร์สเรียน</p>
            </div>
          </ConfirmButton>

          <CreateCourseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            handleInputChange={handleInputChange}
            handleImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
          />

          <div className="flex flex-row flex-wrap mt-6 gap-10 text-[#FAFAFA]">
            {courses?.map((item, index) => (
              <CoursesCard data={item} key={item.courseId || index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

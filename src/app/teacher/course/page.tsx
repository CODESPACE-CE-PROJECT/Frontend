"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createCourse } from "@/actions/course";
import { getAllCourse } from "@/actions/course";
import { ConfirmButton } from "@/components/Button/ConfirmButton";
import { CreatCourseModal } from "@/components/Modals/CreateCourseModal";
import { CoursesCard } from "@/components/Courses/CoursesCard";
import { Loading } from "@/components/Loading/Loading";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { ICourse } from "@/types/course";
import { TopNav } from "@/components/Navbar/TopNav";

export default function Page() {
  const [showCreateClass, setShowCreateClass] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [courseName, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [courses, setCourses] = useState<ICourse[]>();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchCourses = async () => {
      const { status, data } = await getAllCourse();
      if (status === 200) {
        setCourses(data);
      }
      const profile: IProfile = await getProfile();
      setProfile(profile);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const toggleCreateClass = () => {
    setShowCreateClass(!showCreateClass);
    if (showCreateClass) {
      setCourseName("");
      setDescription("");
      setProfileImage("");
      setErrorMessage("");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const newCourse = await createCourse({
        title: courseName,
        description: description,
      });

      setCourses((prevCourses = []) => [...prevCourses, newCourse]);
      toggleCreateClass();
    } catch (error: any) {
      if (
        error.response?.data?.message ===
        "Over limit Create Course Per Teacher 3"
      ) {
        setErrorMessage("คุณไม่สามารถสร้างชั้นเรียนเกิน 3 ชั้นเรียนได้");
      } else {
        console.error("Error creating course:", error);
        setErrorMessage("ไม่สามารถสร้างชั้นเรียนซ้ำได้");
      }
    } finally {
      setLoading(false);
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

          <ConfirmButton className="self-end px-3">
            <div className="flex flex-row items-center gap-x-4">
              <PersonAddIcon />
              <p>สร้างชั้นเรียน</p>
            </div>
          </ConfirmButton>
          <CreatCourseModal />
          {showCreateClass && (
            <div className="fixed inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50 ">
              <div className="bg-white p-8 rounded-lg shadow-lg  w-11/12 max-w-2xl">
                <h2 className="text-center text-lg font-semibold mb-6 text-gray-900">
                  สร้างคอร์สในโรงเรียน
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-6 "
                >
                  <fieldset className="flex flex-col h-full">
                    <div
                      className="relative flex flex-col items-center justify-center h-32 bg-white rounded-lg cursor-pointer border-2 border-dashed border-gray-300 "
                      role="button"
                      aria-label="เลือกรูปภาพ"
                    >
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile Picture"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          width={100}
                          height={100}
                          priority={true}
                        />
                      ) : (
                        <div className="text-center text-gray-500">
                          <AddPhotoAlternateIcon className="text-4xl mb-2" />
                          <p className="text-base text-black pb-2">
                            เลือกรูปภาพพื้นหลังของคอร์สเรียน *
                          </p>
                          <p className="pb-2 text-sm text-[#CED4DA]">
                            JPEG, PNG ขนาดไม่เกิน 50MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        aria-hidden="true"
                      />
                      <button className="text-sm font-semibold text-[#54575C] border border-[#CED4DA] rounded-lg w-20 h-20 flex items-center justify-center   mb-3">
                        เลือกไฟล์
                      </button>
                    </div>
                  </fieldset>

                  <div>
                    <label
                      htmlFor="courseName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ชื่อชั้นเรียน:
                    </label>
                    <input
                      id="courseName"
                      type="text"
                      value={courseName}
                      placeholder="ชื่อชั้นเรียน"
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full px-4 py-2 shadow-sm border border-[#CED4DA] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      รายละเอียด
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-[#CED4DA] rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black pl-3 pt-3"
                      placeholder="รายละเอียด"
                      maxLength={200}
                    ></textarea>
                    <div className="text-right text-sm mt-1 text-black">
                      {description.length}/200
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-sm">{errorMessage}</div>
                  )}

                  <div className="flex  items-center justify-center space-x-7 ">
                    <button
                      type="button"
                      className="border border-[#CED4DA] text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 w-32"
                      onClick={toggleCreateClass}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`py-2 px-4 rounded-lg text-white w-32 ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#5572FA] hover:bg-blue-700"
                      }`}
                    >
                      {loading ? "กำลังสร้าง..." : "สร้าง"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-row flex-wrap mt-6 gap-10 text-[#FAFAFA]">
            {courses?.map((item) => (
              <CoursesCard data={item} key={item.courseId} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

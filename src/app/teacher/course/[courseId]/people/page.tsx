"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getpeople,
  addPeopleToCourse,
  deletePeopleByCoursesId,
} from "@/actions/course";

import { SearchBar } from "@/components/Input/SerachBar";
import { IPeople } from "@/types/course";
import { IProfile } from "@/types/user";
import { PeopleTableTeacher } from "@/components/Table/PeopleTableTeacher";
import AddIcon from "@mui/icons-material/Add";
import { getProfile } from "@/actions/user";
import { TopNav } from "@/components/Navbar/TopNav";
import { Loading } from "@/components/Loading/Loading";
import { AddPeopleModal } from "@/components/Modals/AddPeopleModal";
import { ISchool } from "@/types/school";
import { getUserBySchoolId } from "@/actions/school";
import { NotifyType } from "@/enum/enum";
import { notify, updateNotify } from "@/utils/toast.util";

export default function People() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] =
    useState<{ courseTeacherId: string; user: IProfile }[]>();
  const [students, setStudents] =
    useState<{ courseStudentId: string; user: IProfile }[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [alluser, setAlluser] = useState<IPeople>();
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [school, setSchool] = useState<ISchool>();

  const handleAddPeople = async (selectedUsers: string[]) => {
    const id = notify(NotifyType.LOADING, "กำลังเพิ่มบัญชีผู้ใช้เข้าสู่คอร์ส");
    const response = await addPeopleToCourse({
      courseId: courseId,
      users: selectedUsers,
    });

    if (id) {
      if (selectedUsers.length != 0 && response.status === 201) {
        setIsModalOpen(false);
        updateNotify(
          id,
          NotifyType.SUCCESS,
          "เพิ่มบัญชีผู้ใช้เข้าสู่คอร์สเสร็จสิ้น"
        );
        const response: IPeople = await getpeople(courseId);
        setAlluser(response);
      } else if (response.status === 400) {
        updateNotify(
          id,
          NotifyType.ERROR,
          "มีบัญชีผู้ใช้อยู่ในคอร์สแล้วหรือไม่พบบัญชีผู้ใช้"
        );
      } else if (selectedUsers.length == 0) {
        updateNotify(
          id,
          NotifyType.ERROR,
          "กรุณาเลือกบัญชีผู้ใช้ เพื่อเพิ่มผู้ใช้เข้าสู่คอร์ส"
        );
      } else {
        updateNotify(
          id,
          NotifyType.ERROR,
          "เกิดข้อผิดผลาดในการเพิ่มผู้ใช้เข้าสู่คอร์ส"
        );
      }
    }
  };

  const handleOnClickOption = async (name: string, username: string) => {
    if (name === "delete") {
      const id = notify(NotifyType.LOADING, "กำลังนำบัญชีผู้ใช้ออกจากคอร์ส");
      const { status } = await deletePeopleByCoursesId(courseId, username);
      if (id) {
        if (status === 200) {
          updateNotify(
            id,
            NotifyType.SUCCESS,
            "นำบัญชีผู้ใช้ออกจากคอร์สเสร็จสิ้น"
          );
          const response: IPeople = await getpeople(courseId);
          setAlluser(response);
        } else {
          updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดผลาดในการนำออก");
        }
      }
    }
  };

  useEffect(() => {
    const fetchPeople = async () => {
      const response: IPeople = await getpeople(courseId);
      const teacherData = response.courseTeacher;
      const studentData = response.courseStudent;

      const profile: IProfile = await getProfile();
      setProfile(profile);

      const { data } = await getUserBySchoolId(profile.schoolId);
      setSchool(data);

      setAlluser(response);
      setTeachers(teacherData);
      setStudents(studentData);
      setLoading(false);
    };
    fetchPeople();
  }, [courseId]);

  useEffect(() => {
    setTeachers(
      alluser?.courseTeacher.filter(
        (items) =>
          items.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          items.user.lastName.toLowerCase().includes(search.toLowerCase())
      )
    );
    setStudents(
      alluser?.courseStudent.filter(
        (items) =>
          items.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          items.user.lastName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, alluser]);

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
            <p>สมาชิก</p>
          </TopNav>
          <div className="flex items-center my-3 py-3 rounded-md focus:border-[#1E90FF] duration-200  space-x-9 ">
            <SearchBar onChange={(value) => setSearch(value)} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5572FA] rounded-md hover:bg-[#788ff7] w-36 py-3 px-4 "
            >
              <AddIcon /> เพิ่มสมาชิก
            </button>
          </div>
          <PeopleTableTeacher
            teachers={teachers}
            students={students}
            onClickOption={handleOnClickOption}
          />

          <AddPeopleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            users={school?.users}
            currentCourseUsers={alluser}
            onClick={handleAddPeople}
          />
        </>
      )}
    </>
  );
}

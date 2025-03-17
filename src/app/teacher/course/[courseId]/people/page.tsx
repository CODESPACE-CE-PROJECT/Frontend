"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getpeople } from "@/actions/course";

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

export default function People() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] =
    useState<{ courseTeacherId: string; user: IProfile }[]>();
  const [students, setStudents] =
    useState<{ courseStudentId: string; user: IProfile }[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alluser, setAlluser] = useState<IPeople>();
  const [profile, setProfile] = useState<IProfile>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [school, setSchool] = useState<ISchool>();

  useEffect(() => {
    const fetchPeople = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const response: IPeople = await getpeople(courseId);
        const teacherData = response.courseTeacher;
        const studentData = response.courseStudent;
        const profile: IProfile = await getProfile();
        setProfile(profile);

        const { status, data } = await getUserBySchoolId(profile.schoolId);
        if (status === 200) {
          setSchool(data);
        } else {
          return;
        }
        setAlluser(response);
        setTeachers(teacherData);
        setStudents(studentData);
      } catch (err: any) {
        console.error("Error fetching people data:", err);
        setError(err.message);
      }
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

  if (error) return <div>Error: {error}</div>;

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
          <PeopleTableTeacher teachers={teachers} students={students} />

          <AddPeopleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            users={school?.users}
          />
        </>
      )}
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getpeople } from "@/actions/course";
import { SearchBar } from "@/components/Input/SerachBar";
import { IPeople } from "@/types/course";
import { IProfile } from "@/types/user";
import { PeopleTable } from "@/components/Table/PeopleTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";

export default function People() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] =
    useState<{ courseTeacherId: string; user: IProfile }[]>();
  const [students, setStudents] =
    useState<{ courseStudentId: string; user: IProfile }[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alluser, SetAlluser] = useState<IPeople>();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchPeople = async () => {
      const profile: IProfile = await getProfile();
      setProfile(profile);
      if (!courseId) return;
      setLoading(true);
      try {
        const data: IPeople = await getpeople(courseId);
        const teacherData = data.courseTeacher;
        const studentData = data.courseStudent;

        SetAlluser(data);
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
        <div className="flex flex-col items-center justify-center h-[70vh]">
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
          <div className="flex items-center my-3 py-3 rounded-md focus:border-[#1E90FF] duration-200  ">
            <SearchBar onChange={(value) => setSearch(value)} />
          </div>
          <PeopleTable teachers={teachers} students={students} />
        </>)}
    </>
  );
}

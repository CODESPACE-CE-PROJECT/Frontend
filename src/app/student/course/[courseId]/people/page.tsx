"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getpeople } from "@/actions/course";
import Image from "next/image";

import { Role } from "@/enum/enum";
import { SearchBar } from "@/components/Input/SerachBar";
import { IPeople } from "@/types/course";
import { IProfile } from "@/types/user";
import { getAvatar } from "@/utils/gender.util";
import { PeopleTable } from "@/components/Table/PeopleTable";
import { TopNav } from "@/components/Navbar/TopNav";
import { getProfile } from "@/actions/user";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <TopNav
        disableNotification={false}
        imageUrl={profile?.pictureUrl}
        role={profile?.role}
      >
        <p>สมาชิก</p>
      </TopNav>
      <div className="flex items-center my-3 py-3 rounded-md focus:border-[#1E90FF] duration-200  ">
        <SearchBar onChange={(value) => setSearch(value)} />
      </div>
      <PeopleTable teachers={teachers} students={students} />
    </>
  );
}

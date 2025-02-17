"use client";

import { useState, useEffect } from "react";
import { getAllCourse } from "@/actions/course";
import { CoursesCard } from "@/components/Courses/CoursesCard";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { ICourse } from "@/types/course";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchCourses = async () => {
        const {status, data} = await getAllCourse();
        if(status === 200){
          setCourses(data)
        }
        const profile: IProfile = await getProfile();
        setProfile(profile);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="flex flex-col p-10 w-screen h-screen">
        <TopNav
          disableNotification={false}
          imageUrl={profile?.pictureUrl}
          role={profile?.role}
        >
          <p className="p-[10px]">คอร์สเรียน</p>
        </TopNav>

        <div className="flex flex-col mt-6 text-[#FAFAFA]">
          {
            courses?.map((item) => <CoursesCard data={item} key={item.courseId} />)
          }
        </div>
      </div>
    </>
  );
}

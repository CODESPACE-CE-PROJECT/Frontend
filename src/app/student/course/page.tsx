"use client";

import { useState, useEffect } from "react";
import { getAllCourse } from "@/actions/course";
import { CoursesCard } from "@/components/Courses/CoursesCard";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { ICourse } from "@/types/course";
import { Loading } from "@/components/Loading/Loading";

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>();
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { status, data } = await getAllCourse();
      if (status === 200) {
        setCourses(data)
      }
      const profile: IProfile = await getProfile();
      setProfile(profile);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <Loading className="size-20" />
        </div>
      ) : (
        <div className="flex flex-col p-10 w-screen h-screen">
          <TopNav
            disableNotification={false}
            imageUrl={profile?.pictureUrl}
            gender={profile?.gender}
            role={profile?.role}
          >
            <p className="p-[10px]">คอร์สเรียน</p>
          </TopNav>

          <div className="flex flex-row flex-wrap mt-6 gap-10 text-[#FAFAFA]">
            {
              courses?.map((item) => <CoursesCard data={item} key={item.courseId} />)
            }
          </div>
        </div>
      )}
    </>
}
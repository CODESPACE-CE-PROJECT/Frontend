"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllCourse } from "@/actions/course";
import CoursesCard from "@/components/Courses/CoursesCard";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";
import { getProfile } from "@/actions/user";
import { Loading } from "@/components/Loading/Loading";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourse();
        const profile: IProfile = await getProfile();
        setProfile(profile);
        if (response && response.data) {
          setCourses(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
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
            role={profile?.role}
            gender={profile?.gender}
          >
            <p className="p-[10px]">คอร์สเรียน</p>
          </TopNav>
          <div className="flex flex-col mt-6 text-[#FAFAFA] w-full">
            <CoursesCard />
          </div>
        </div>
      )}
    </>
}

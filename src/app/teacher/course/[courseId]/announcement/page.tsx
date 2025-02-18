"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCoursesById } from "@/actions/announcement";
import { getProfile } from "@/actions/user";
import { ICourse } from "@/types/course";
import { IProfile } from "@/types/user";
import { TopNav } from "@/components/Navbar/TopNav";
import { ICourseAnnounce } from "@/types/courseAnnounce";

export default function Page() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<ICourseAnnounce[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<IProfile>();
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response: ICourse = await getCoursesById(courseId);
        const profile: IProfile = await getProfile();
        setCourseDetails(response);
        setAnnouncement(response.courseAnnounce || []);
        setProfile(profile);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);
  return (
    <>
      <TopNav
        disableNotification={false}
        imageUrl={profile?.pictureUrl}
        role={profile?.role}
        gender={profile?.gender}
      >
        <p>{courseDetails?.title}</p>
      </TopNav>
    </>
  );
}

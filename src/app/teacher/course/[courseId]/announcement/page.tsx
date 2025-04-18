"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCoursesById } from "@/actions/course";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { ICourse } from "@/types/course";
import { TopNav } from "@/components/Navbar/TopNav";
import AnnouncementCard from "@/components/Courses/AnnouncementCard";
import { IAssignment } from "@/types/course";
import { Loading } from "@/components/Loading/Loading";

export default function Page() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<IAssignment[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      const response: ICourse = await getCoursesById(courseId);
      const profile: IProfile = await getProfile();
      setCourseDetails(response);
      setAnnouncement(response.assignment || []);
      setProfile(profile);
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId]);

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
            <p>{courseDetails?.title}</p>
          </TopNav>

          <p className="flex mt-6 text-lg text-wrap">
            {courseDetails?.description}
          </p>

          <div className="flex flex-col items-center gap-y-5 px-14 py-6">
            {announcement.length > 0 ? (
              announcement.map((announce) => (
                <AnnouncementCard
                  key={announce.assignmentId}
                  courseId={courseId}
                  announcement={announce}
                  role="teacher"
                />
              ))
            ) : (
              <p className="text-center">ยังไม่มีการประกาศ</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

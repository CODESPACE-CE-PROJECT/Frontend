"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCoursesById } from "@/actions/announcement";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { ICourse } from "@/types/course";
import { TopNav } from "@/components/Navbar/TopNav";
import AnnouncementCard from "@/components/Courses/AnnouncementCard";
import { IAssignment } from "@/types/course";

export default function Page() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<IAssignment[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchCourseData = async () => {
      const response: ICourse = await getCoursesById(courseId);
      const profile: IProfile = await getProfile();
      setCourseDetails(response);
      setAnnouncement(response.assignment || []);
      setProfile(profile);
    };

    fetchCourseData();
  }, [courseId]);

  return (
    <>
      <TopNav
        disableNotification={false}
        imageUrl={profile?.pictureUrl}
        role={profile?.role}
      >
        <p>{courseDetails?.title}</p>
      </TopNav>

      <p className="flex px-4 py-3 my-6 text-lg text-wrap">
        {courseDetails?.description}
      </p>

      <div className="flex flex-col items-center space-y-5 px-40">
        {announcement.length > 0 ? (
          announcement.map((announce) => (
            <AnnouncementCard
              key={announce.assignmentId}
              courseId={courseId}
              announcement={announce}
            />
          ))
        ) : (
          <p className="text-center">ยังไม่มีการประกาศ</p>
        )}
      </div>
    </>
  );
}

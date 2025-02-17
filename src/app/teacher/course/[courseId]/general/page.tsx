"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCoursesById } from "@/actions/announcement";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { ICourse } from "@/types/course";
import { ICourseAnnounce } from "@/types/courseAnnounce";
import { createReplyAnnounce } from "@/actions/announcement";
import { TopNav } from "@/components/Navbar/TopNav";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import AnnounceCard from "@/components/Courses/AnnounceCard";

export default function Page() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<ICourseAnnounce[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  const [profile, setProfile] = useState<IProfile>();

  useEffect(() => {
    const fetchCourseData = async () => {
      const response: ICourse = await getCoursesById(courseId);
      const profile: IProfile = await getProfile();
      setCourseDetails(response);
      setAnnouncement(response.courseAnnounce || []);
      setProfile(profile);
    };

    fetchCourseData();
  }, [courseId]);

  const handleReply = async (courseAnnounceId: string, message: string) => {
    if (!message.trim()) return;
    const id = notify(NotifyType.LOADING, "กำลังตอบกลับ");
    const { status } = await createReplyAnnounce({
      courseAnnounceId,
      message,
    });

    if (id !== undefined) {
      if (status === 201) {
        updateNotify(id, NotifyType.SUCCESS, "ตอบกลับสำเร็จ");
        setAnnouncement((prevAnnouncements) =>
          prevAnnouncements.map((announce) =>
            announce.courseAnnounceId === courseAnnounceId
              ? { ...announce, replyAnnounce: [...announce.replyAnnounce] }
              : announce
          )
        );
      } else {
        updateNotify(id, NotifyType.ERROR, "เกิดข้อผิดพลาดในการตอบกลับ");
      }
    }
  };

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

      <p className="flex px-4 py-3 my-6 text-lg text-wrap">
        {courseDetails?.description}
      </p>

      <div className="flex flex-col items-center space-y-5 px-40">
        {announcement.length > 0 ? (
          announcement.map((announce) => (
            <AnnounceCard
              key={announce.courseAnnounceId}
              announce={announce}
              profilePicture={profile?.pictureUrl || ""}
              handleReply={handleReply}
            />
          ))
        ) : (
          <p className="text-center">ยังไม่มีการประกาศ</p>
        )}
      </div>
    </>
  );
}

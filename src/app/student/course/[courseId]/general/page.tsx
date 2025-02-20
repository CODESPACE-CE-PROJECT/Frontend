"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCoursesById } from "@/actions/course";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { ICourse } from "@/types/course";
import { ICourseAnnounce } from "@/types/courseAnnounce";
import { createReplyAnnounce } from "@/actions/announcement";
import { TopNav } from "@/components/Navbar/TopNav";
import { notify, updateNotify } from "@/utils/toast.util";
import { NotifyType } from "@/enum/enum";
import AnnounceCard from "@/components/Courses/AnnounceCard";
import { Loading } from "@/components/Loading/Loading";

export default function Page() {
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announce, setAnnounce] = useState<ICourseAnnounce[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse>();
  const [profile, setProfile] = useState<IProfile>();
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchCourseData = async () => {
      const response: ICourse = await getCoursesById(courseId);
      const profile: IProfile = await getProfile();
      setCourseDetails(response);
      setAnnounce(response.courseAnnounce || []);
      setProfile(profile);
      setLoading(false);
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
        setAnnounce((prevAnnounce) =>
          prevAnnounce.map((announce) =>
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
          >
            <p>{courseDetails?.title}</p>
          </TopNav>

          <p className="flex py-3 my-6 text-lg text-wrap">
            {courseDetails?.description}
          </p>

          <div className="flex flex-col items-center space-y-5 px-40">
            {announce.length > 0 ? (
              announce.map((announce) => (
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
        </>)}
    </>
  );
}

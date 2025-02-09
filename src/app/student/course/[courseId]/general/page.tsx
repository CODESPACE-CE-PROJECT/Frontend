"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getCoursesById } from "@/actions/announcement";
import Image from "next/image";
import TeacherProfile from "@/assets/CoursesAssets/TeacherIcon.svg";
import UserProfileIcon from "@/assets/CoursesAssets/UserProfileIcon.svg";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { ICourse } from "@/types/course";
import { ICourseAnnounce } from "@/types/courseAnnounce";
import ReplyEditor from "@/components/Courses/ReplyEditor";

export default function Announcement() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<ICourseAnnounce[]>([]);
  const [courseDetails, setCourseDetails] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProfile, setProfile] = useState<IProfile | null>(null);
  const [showReplyBox, setShowReplyBox] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response: ICourse = await getCoursesById(courseId);
        setCourseDetails(response);
        setAnnouncement(response.courseAnnounce || []);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response: IProfile = await getProfile();
        setProfile(response);
        setLoading(false);
        console.log(response);
      } catch {
        setLoading(false);
      }
    };

    fetchCourseData();
    fetchProfileData();
  }, [courseId]);

  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 py-4 text-4xl">{courseDetails?.title}</h1>
        </div>
        <h2 className="flex pl-10 text-1xl">{courseDetails?.description}</h2>
      </div>

      {/* head */}
      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        {announcement.length > 0 ? (
          announcement.map((announce) => (
            <div
              key={announce.courseAnnounceId}
              className="bg-[#16233A] rounded-md border-2 border-slate-900 w-full"
            >
              <div>
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <Image
                    src={announce.user.pictureUrl || TeacherProfile}
                    width={50}
                    height={50}
                    alt="Teacher Profile"
                  />
                  <div className="flex flex-row space-x-2">
                    <p className="text-xl">{announce?.user?.firstName}</p>
                    <p className="text-xl">{announce?.user?.lastName}</p>
                  </div>
                  <h2 className="text-sm">
                    {new Date(announce.createdAt).toLocaleString()}
                  </h2>
                </div>

                <div className="mx-8 space-y-5">
                  <div>
                    {announce.description.split("\r\n").map((line, index) => (
                      <div
                        key={index}
                        className={
                          index === 0 ? "font-bold pb-3" : "font-normal pb-3"
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* divider */}
              <div className="h-px border-blackground-text border-t-2 mx-8" />
              <div className="flex flex-row items-start mx-8 my-4">ReplyBox</div>
              {/* divider */}
              <div className="h-px border-blackground-text border-t-2 mx-8" />
              <div className="flex flex-row items-start mx-8 my-4">
                <Image
                  src={isProfile?.pictureUrl || UserProfileIcon}
                  width={40}
                  height={40}
                  alt="User Profile"
                />
                {!showReplyBox ? (
                  <button
                    className="text-sm px-2 py-1 hover:bg-blackground-text rounded"
                    onClick={() => setShowReplyBox(true)}
                  >
                    Reply
                  </button>
                ) : (
                  <ReplyEditor onSend={() => setShowReplyBox(false)} />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">ยังไม่มีการประกาศ</p>
        )}
      </div>
    </>
  );
}

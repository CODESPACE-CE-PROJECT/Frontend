import React, { useState } from "react";
import Image from "next/image";
import TeacherProfile from "@/assets/CoursesAssets/TeacherIcon.svg";
import { IAssignment } from "@/types/course";
import Link from "next/link";

interface AnnouncementProps {
  courseId: string;
  announcement: IAssignment;
}

const AnnouncementCard: React.FC<AnnouncementProps> = ({
  courseId,
  announcement,
}) => {
  return (
    <div className="bg-[#16233A] rounded-md w-full">
      <div className="mx-8">
        <div className="flex flex-row items-center space-x-5 font-light text-lg my-4">
          <Image
            src={announcement.user.pictureUrl || TeacherProfile}
            width={100}
            height={100}
            alt="Teacher Profile"
            className="h-12 w-12"
          />
          <div className="flex flex-row space-x-2">
            <p className="text-xl">{announcement?.user?.firstName}</p>
            <p className="text-xl">{announcement?.user?.lastName}</p>
          </div>
          <h2 className="text-sm">
            {new Date(announcement.createdAt).toLocaleString()}
          </h2>
        </div>

        <div className="flex justify-between items-center mb-5 p-4 bg-[#2C3A4E] rounded">
          <div className="flex flex-col space-y-3">
            <p className="font-medium text-wrap">{announcement.title}</p>
            <p className="flex flex-row font-medium items-center space-x-1 text-sm text-wrap">
              <span>วันสิ้นสุดการบ้าน</span>
              <span className="text-sm font-light text-gray-200">
                {new Date(announcement.expireAt).toLocaleString("th-TH")}
              </span>
            </p>
          </div>

          <button className="self-end text-sm rounded px-4 py-2 hover:bg-[#808080]">
            <Link href={`/student/course/${courseId}/assignment/exercise`}>
              ดูงานที่ได้รับมอบหมาย
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;

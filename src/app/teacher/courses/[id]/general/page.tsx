"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import { getAnnouncementsByCourseId } from "@/app/services/user.service";

// Reusable InfoBox Component
const InfoBox = ({
  title,
  date,
  content,
}: {
  title: string;
  date: string;
  content: string;
}) => (
  <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
    <div className="border-[#131823] border-b-2">
      <div className="flex flex-row items-center gap-x-5 font-light text-lg mx-8 my-4">
        <AccountCircleIcon className="text-5xl" />
        <h1>Rattananporn Somchainuek</h1>
        <h2>{date}</h2>
      </div>
      <div className="mx-8 mb-5 space-y-5">
        <div className="font-bold text-wrap">{title}</div>
        <div className="text-sm text-wrap">{content}</div>
      </div>
    </div>
    <div className="flex flex-row items-center gap-x-5 mx-8 my-3">
      <PersonIcon className="text-3xl" />
      <h1 className="text-lg">Reply</h1>
    </div>
  </div>
);

// Reusable AssignBox Component
const AssignBox = ({
  title,
  date,
  content,
}: {
  title: string;
  date: string;
  content: string;
}) => (
  <div className="bg-[#1C2433] rounded-md border-2 border-slate-900 w-full">
    <div className="border-[#131823] border-b-2">
      <div className="flex flex-row items-center gap-x-5 font-light text-lg mx-8 my-4">
        <AccountCircleIcon className="text-5xl" />
        <h1>Rattananporn Somchainuek</h1>
        <h2>{date}</h2>
      </div>
      <div className="mx-8 mb-5 space-y-5 p-5 bg-[#2C3A4E]">
        <div className="font-bold text-wrap">{title}</div>
        <div className="text-sm text-wrap">{content}</div>
        <button className="bg-[#475766] text-sm border-2 rounded px-4 py-2">
          ดูงานที่ได้รับมอบหมาย
        </button>
      </div>
    </div>
    <div className="flex flex-row items-center gap-x-5 mx-8 my-3">
      <PersonIcon className="text-3xl" />
      <h1 className="text-lg">Reply</h1>
    </div>
  </div>
);

export default function General() {
  const { id } = useParams(); // Capture the course ID from URL
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncementsByCourseId(id as string);
      if (data) {
        setAnnouncements(data.data); // Assuming the announcements are in data.data
      } else {
        setError('Failed to fetch announcements');
      }
    };

    fetchAnnouncements();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 border-[#1E90FF] border-b-2 font-semibold text-lg py-4">
            ทั่วไป
          </h1>
        </div>
        <span className="z-0 absolute bottom-0 bg-[#090B11] p-[1px] w-full"></span>
      </div>

      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        {/* Render InfoBox for each announcement */}
        {announcements.map((announce) => (
          <InfoBox
            key={announce.courseAnnounceId}
            title={announce.title}
            date={new Date(announce.createdAt).toLocaleString()} // Format the date as needed
            content={announce.description}
          />
        ))}
      </div>
    </>
  );
}

"use client"; // Add this line at the top

import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

import { useDispatch } from "react-redux";
import {
  courseNavSelector,
  setIsCloseCourseNav,
} from "@/app/store/slices/courseNavSlice";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getCoursesById } from "../../../../services/announcement.service";
import Image from "next/image";
import TeacherProfile from "@/app/assets/CoursesAssets/TeacherIcon.svg";
import { getProfile } from "@/app/services/user.service";
import { IProfile } from "@/app/interfaces/user.interface";

export default function Announcement() {
  const router = useRouter();
  const param = useParams<{ courseId: string }>();
  const courseId = param.courseId;
  const [announcement, setAnnouncement] = useState<any[]>([]);
  const [courseDetails, setCourseDetails] = useState<any>(null); // Add state for course details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProfile, setProfile] = useState<IProfile | null>(null);
  const courseNavReducer = useSelector(courseNavSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsCloseCourseNav(false));
    const fetchAnnouncementsAndCourseDetails = async () => {
      if (!courseId) return;
      setLoading(true);
      try {
        const data = await getCoursesById(courseId);
        console.log("Fetched data:", data);
        if (data?.data) {
          setAnnouncement(data.data.courseAnnounce);
          setCourseDetails({
            title: data.data.title,
            description: data.data.description,
          });
        }
        const fetchGetProfile: IProfile = await getProfile();
        setProfile(fetchGetProfile);
      } catch (err: any) {
        console.error("Error fetching assignments:", err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAnnouncementsAndCourseDetails();
  }, [courseId, dispatch]);

  return (
    <>
      <div className="relative w-full">
        <div className="flex pl-10">
          <h1 className="z-10 py-4 text-4xl">{courseDetails?.title}</h1>
        </div>
        <h1 className="flex pl-10 text-1xl">{courseDetails?.description}</h1>
      </div>

      {/* head */}
      <div className="flex flex-col items-center space-y-10 px-40 py-5">
        {announcement.map((announce) => (
          <div
            key={announce.courseAnnounceId}
            className="bg-[#16233A] rounded-md border-2 border-slate-900 w-full"
          >
            <div className="border-[#131823] border-b-2 space-y-5">
              <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                <Image
                  src={announce.user.pictureUrl || TeacherProfile}
                  width={50}
                  height={50}
                  alt="Teacher Profile"
                />
                <div className="flex flex-row space-x-2">
                  <p className="text-xl">{announce.user.firstName}</p>
                  <p className="text-xl">{announce.user.lastName}</p>
                </div>
                <h2 className="text-sm">
                  {new Date(announce.createdAt).toLocaleString()}
                </h2>
              </div>

              <div className="mx-8 pb-5 space-y-5">
                <div className="font-bold text-wrap">
                  {announce.description}
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center space-x-5 mx-8 my-3">
              <Image
                src={isProfile?.pictureUrl || TeacherProfile}
                width={40}
                height={40}
                alt="Teacher Profile"
              />
              <h1 className="text-lg">Reply</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
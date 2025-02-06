"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserProfileIcon from "../../app/assets/CoursesAssets/UserProfileIcon.svg";
import Link from "next/link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";
import { Role } from "@/enum/enum";
import { useParams, usePathname } from "next/navigation";
import { getProblemById } from "@/actions/problem";
import { getCoursesById } from "@/actions/announcement";
import { getAssignment } from "@/actions/assignment";

interface UserNavProps {
  role: Role;
}

export default function UserNav({ role }: UserNavProps) {
  const [isProfile, setProfile] = useState<IProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const params = useParams<{ courseId: string; problemId: string }>();
  const [loading, setLoading] = useState(true);
  const [problemDetails, setProblemDetails] = useState<any>(null);
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [assignmentDetails, setAssignmentDetails] = useState<any>(null);
  const { problemId } = params;

  useEffect(() => {
    const fetchUserProfileDetails = async () => {
      try {
        const fetchGetProfile: IProfile = await getProfile();
        setProfile(fetchGetProfile);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setError(err.message);
      }
    };

    const fetchDetails = async () => {
      try {
        setLoading(true);

        const problemData = await getProblemById(problemId);
        setProblemDetails(problemData?.data);

        const courseData = await getCoursesById(params.courseId);
        setCourseDetails(courseData?.data);

        const assignment = await getAssignment(params.courseId);
        setAssignmentDetails(assignment?.data);
      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    fetchUserProfileDetails();
  }, [problemId, params.courseId]);

  const courseTitle = courseDetails?.title || "N/A";
  const assignmentTitle =
    assignmentDetails?.assignment?.find(
      (assignment: any) =>
        assignment.assignmentId === problemDetails?.assignmentId
    )?.title || "N/A";
  const problemTitle = problemDetails?.title || "N/A";

  const getProfileLink = () => {
    switch (role) {
      case Role.STUDENT:
        return "/student/profile";
      case Role.TEACHER:
        return "/teacher/profile";
      case Role.ADMIN:
        return "/admin/profile";
      default:
        return "/";
    }
  };

  const getPageTitle = () => {
    switch (true) {
      case /^\/[^/]+\/calendar$/.test(pathname):
        return "ปฏิทิน";
      case /^\/[^/]+\/courses$/.test(pathname):
        return "คอร์สเรียน";
      case /^\/[^/]+\/profile$/.test(pathname):
        return "โปรไฟล์";
      case /^\/[^/]+\/courses\/[^/]+\/[^/]+$/.test(pathname):
        return `${courseTitle}`;
      case /^\/[^/]+\/courses\/[^/]+\/[^/]+\/[^/]+$/.test(pathname):
        return `${courseTitle}`;
      case /^\/[^/]+\/courses\/[^/]+\/assignment\/homeworkassignment\/[^/]+$/.test(
        pathname
      ):
        return `${courseTitle} / ${assignmentTitle} / ${problemTitle}`;
      case /^\/[^/]+\/courses\/[^/]+\/assignment\/testassignment\/[^/]+$/.test(
        pathname
      ):
        return `testassignment`; // เดี๋ยวมาแก้นะครับ
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center text-white mb-6">
        <div className="text-[2rem] font-semibold leading-[120%] tracking-[0.16px]">
          {loading ? (
            <div className="h-8 w-96 bg-gray-700 animate-pulse rounded-md"></div>
          ) : (
            getPageTitle()
          )}
        </div>
        <div className="flex flex-row items-center space-x-7">
          <NotificationsNoneIcon fontSize="large" />
          <Link className="rounded-full" href={getProfileLink()}>
            <Image
              className="border-[1px] border-[#2A3A50] rounded-full"
              src={isProfile?.pictureUrl || UserProfileIcon}
              width={40}
              height={40}
              alt="Teacher Profile"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

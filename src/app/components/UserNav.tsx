"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import UserProfileIcon from "../../app/assets/CoursesAssets/UserProfileIcon.svg";
import Link from "next/link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { getProfile } from "@/app/services/user.service";
import { IProfile } from "@/app/interfaces/user.interface";
import { Role } from "@/app/enum/enum";

interface UserNavProps {
  role: Role | null;
}

export default function UserNav({ role }: UserNavProps) {
  const [isProfile, setProfile] = useState<IProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    fetchUserProfileDetails();
  }, []);

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

  return (
    <>
      <div className="flex flex-row justify-between items-center text-white py-1">
        <div>text</div>
        <div className="flex flex-row items-center space-x-7">
          <NotificationsNoneIcon fontSize="large" />
          <Link href={getProfileLink()}>
            <Image
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

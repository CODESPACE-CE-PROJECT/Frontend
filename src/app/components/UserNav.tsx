"use client"; // Add this line at the top

import Image from "next/image";
import UserProfileIcon from "../../app/assets/CoursesAssets/UserProfileIcon.svg";

export default function UserNav() {
  return (
    <>
      <div className="flex flex-row justify-end items-center bg-[#0B111B] p-3">
        <Image className="" src={UserProfileIcon} alt=""></Image>
      </div>
    </>
  );
}

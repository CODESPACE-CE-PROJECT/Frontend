"use client"; // Add this line at the top

import Image from "next/image";
import PlatformIcon from "../../app/assets/CoursesAssets/PlatformIcon.svg";
import UserProfileIcon from "../../app/assets/CoursesAssets/UserProfileIcon.svg";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

// Define the props type
interface UserNavProps {
  toggleSideNav: () => void;
}

export default function UserNav({ toggleSideNav }: UserNavProps) {
  return (
    <>
      <div className="flex flex-row justify-between items-center ml-7 m-4">
        {/* left */}
        <div className="flex flex-row items-center space-x-5">
          {/* Hamburger box */}
          <button
            onClick={toggleSideNav}
            className="flex justify-center items-center hover:bg-[#1F2936] rounded-full w-10 h-10 p-6"
            aria-label="Menu"
          >
            <MenuIcon className="text-3xl text-[#FFFBFB]" />
          </button>
          <Image className="w-12" src={PlatformIcon} alt=""></Image>
          <h1 className="text-white font-bold">Name Platform</h1>
        </div>

        {/* right */}
        <div className="flex flex-row items-center space-x-5">
          <AddIcon className="text-white text-4xl" />
          <Image className="" src={UserProfileIcon} alt=""></Image>
        </div>
      </div>
      <span className="flex flex-col bg-[#E1E1E1] w-screen p-[1px]"></span>
    </>
  );
}

"use client"; // Add this line at the top

import { useState } from "react";
import Image from "next/image";
import UserNav from "../components/UserNav";
import SideNav from "../components/SideNav";

import TeacherIcon from "../../app/assets/CoursesAssets/TeacherIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Courses() {
  const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };
  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden overscroll-none">
        <UserNav toggleSideNav={toggleSideNav} />
        <SideNav toggleSideNav={toggleSideNav} isVisible={isSideNavVisible} />

        <div className="flex flex-col space-y-10 my-10 w-full">
          {/* row 1 */}
          <div className="flex flex-row justify-around ">
            {/* item1 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item2 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item3 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
          </div>
          {/* row 1 */}
          <div className="flex flex-row justify-around ">
            {/* item1 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item2 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item3 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
          </div>

          {/* row 1 */}
          <div className="flex flex-row justify-around ">
            {/* item1 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item2 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
            {/* item3 */}
            <div className="flex flex-col bg-white rounded-lg w-96">
              <div className="flex flex-row-reverse bg-[#BDBDF2] text-white rounded-t-lg font-black pb-28 pt-3 px-1">
                <MoreVertIcon
                  onClick={() => alert("setting")}
                  className="cursor-pointer text-3xl rounded-full hover: bg-inherit"
                />
              </div>
              <div
                onClick={() => alert("go to class")}
                className="p-5 cursor-pointer"
              >
                <h1 className="text-2xl font-bold ">
                  Ergonomi Pertanian dan Keselamatan Kerja
                </h1>
                <div className="flex flex-row items-center space-x-3 mt-5 mb-16">
                  <Image className="w-10" src={TeacherIcon} alt=""></Image>
                  <span>Jack Harper</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

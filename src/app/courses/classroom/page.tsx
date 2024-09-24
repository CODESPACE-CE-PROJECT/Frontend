"use client"; // Add this line at the top

import UserNav from "@/app/components/UserNav";
import SideNav from "@/app/components/SideNav";
import ClassRoomNav from "@/app/components/ClassRoomNav";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";

export default function Classroom() {
  return (
    <>
      <div className="flex flex-row">
        <SideNav />
        {/* page start */}
        <div className="flex flex-col w-screen overflow-x-hidden overscroll-none">
          <UserNav />
          <ClassRoomNav />

          <div className="flex flex-col items-center py-10 px-40 h-full w-4/5 space-y-10">
            {/* head */}
            <div className="bg-[#009951] text-[#FAFAFA] rounded-md pt-40 pl-10 pb-6 space-y-1 w-full">
              <h1 className="text-2xl font-bold">Ergonomi Pertanian</h1>
              <h2 className="text-lg font-normal">09:00-12:00 (น.)</h2>
            </div>
            {/* box 1 */}
            <div className="bg-[#1C2433] text-[#FAFAFA] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] text-[#FAFAFA] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] text-[#FAFAFA] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
            {/* box any */}
            <div className="bg-[#1C2433] text-[#FAFAFA] rounded-md border-2 border-slate-900 w-full">
              <div className="border-[#131823] border-b-2 space-y-5">
                <div className="flex flex-row items-center space-x-5 font-light text-lg mx-8 my-4">
                  <AccountCircleIcon className="text-5xl" />
                  <h1>Rattananporn Somchainuek</h1>
                  <h2>30/06/2024 8:54 PM</h2>
                </div>

                <div className="mx-8 pb-5 space-y-5">
                  <div className="font-bold text-wrap">
                    วันที่ 01/07/2024 คาบนี้ยังไม่มีการเรียนการสอน
                  </div>
                  <div className="text-sm text-wrap">
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่
                    ECC-801 วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801
                    วันจันทร์ที่ 22 นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22
                    นะคะ ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                    ให้มาเจอกันที่ ECC-801 วันจันทร์ที่ 22 นะคะ
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-5 mx-8 my-3">
                <PersonIcon className="text-3xl" />
                <h1 className="text-lg">Reply</h1>
              </div>
            </div>
          </div>
        </div>
        {/* page end */}
      </div>
    </>
  );
}

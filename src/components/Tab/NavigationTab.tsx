"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  courseId: string;
  basePath: string; // กำหนด path หลักของหน้าที่ใช้ component นี้
}

export default function NavigationTab({ courseId, basePath }: Props) {
  const pathname = usePathname();

  return (
    <div className="relative w-full">
      <div className="flex gap-12 pl-4 mt-6">
        <Link href={`${basePath}/exercise`}>
          <h1
            className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D]${
              pathname.includes("exercise") ? "text-white border-b-4 border-[#5572FA]" : "text-white"
            }`}
          >
            แบบฝึกหัด
          </h1>
        </Link>
        <Link href={`${basePath}/exam`}>
          <h1
            className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D]${
              pathname.includes("exam") ? "text-white border-b-4 border-[#5572FA]" : "text-white"
            }`}
          >
            การทดสอบ
          </h1>
        </Link>
      </div>
    </div>
  );
}

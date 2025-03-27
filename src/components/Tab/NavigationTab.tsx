"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  courseId: string;
  basePath: string;
}

export default function NavigationTab({ courseId, basePath }: Props) {
  const pathname = usePathname();

  return (
    <div className="relative w-full">
      <div className="flex gap-12 pl-4 mt-6">
        <Link href={`${basePath}/exercise`}>
          <p
            className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D]${
              pathname.includes("exercise") ? "text-white border-b-4 border-[#5572FA]" : "text-white"
            }`}
          >
            แบบฝึกหัด
          </p>
        </Link>
        <Link href={`${basePath}/exam`}>
          <p
            className={`text-lg font-semibold cursor-pointer px-4 py-2 pb-2 hover:bg-[#3049724D]${
              pathname.includes("exam") ? "text-white border-b-4 border-[#5572FA]" : "text-white"
            }`}
          >
            การทดสอบ
          </p>
        </Link>
      </div>
    </div>
  );
}

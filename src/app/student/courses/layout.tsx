"use client";
import UserLayout from "@/app/layout/UserLayout";
import ClassLayout from "@/app/layout/ClassLayout";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  courseNavSelector,
  setIsCloseCourseNav,
} from "@/app/store/slices/courseNavSlice";
import UserNav from "@/app/components/UserNav";
import { Role } from "@/app/enum/enum";

export default function Layout({ children }: { children: React.ReactNode }) {
  const param = useParams<{ courseId: string }>();
  const isCloseCourseNav = useSelector(courseNavSelector).isCloseCourseNav; // true (OFF) | false (ON)

  return (
    <UserLayout>
      {isCloseCourseNav ? (
        <div className="my-10 mx-[3.75rem]">
          <UserNav role={Role.STUDENT} />
          {children}
        </div>
      ) : (
        <ClassLayout id={param.courseId}>
          {children}
        </ClassLayout>
      )}
    </UserLayout>
  );
}

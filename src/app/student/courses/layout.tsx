"use client";
import UserLayout from "@/app/layout/UserLayout";
import ClassLayout from "@/app/layout/ClassLayout";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  courseNavSelector,
  setIsCloseCourseNav,
} from "@/app/store/slices/courseNavSlice";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const param = useParams<{ courseId: string }>();
  // const dispatch = useDispatch();
  const isCloseCourseNav = useSelector(courseNavSelector).isCloseCourseNav;

  return (
    <UserLayout>
      {/* Conditional rendering */}
      {isCloseCourseNav ? (
        <>{children}</> // true (OFF)
      ) : (
        <ClassLayout id={param.courseId}>{children}</ClassLayout> // false (ON)
      )}
    </UserLayout>
  );
}

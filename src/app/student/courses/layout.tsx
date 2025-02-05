"use client";
import ClassLayout from "@/app/layout/ClassLayout";
import { useParams } from "next/navigation";
import { useSelector} from "react-redux";
import {
  courseNavSelector,
} from "@/app/store/slices/courseNavSlice";
import { StudentLayout } from "@/app/layout/StudentLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const param = useParams<{ courseId: string }>();
  const isCloseCourseNav = useSelector(courseNavSelector).isCloseCourseNav; // true (OFF) | false (ON)

  return (
    <StudentLayout>
      {isCloseCourseNav && (
        <ClassLayout id={param.courseId}>
          {children}
        </ClassLayout>
      )}
    </StudentLayout>
  );
}

"use client";

import ClassLayout from "@/app/layout/ClassLayout";
import { useParams } from "next/navigation"; // Import useParams

export default function Layout({ children }: { children: React.ReactNode }) {
  const param = useParams<{courseId: string}>(); 
  
  return <ClassLayout id={param.courseId}>{children}</ClassLayout>; 
}

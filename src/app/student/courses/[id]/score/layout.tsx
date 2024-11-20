"use client";

import ClassLayout from "@/app/layout/ClassLayout";
import { useParams } from "next/navigation"; // Import useParams

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id } = useParams(); // Get the course ID from the route

  // Assert that id is a string
  const courseId = Array.isArray(id) ? id[0] : id; // Use the first element if it's an array

  return <ClassLayout id={courseId}>{children}</ClassLayout>; // Pass id to ClassLayout
}

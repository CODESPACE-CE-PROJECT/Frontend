// src/app/student/courses/layout.tsx
import UserLayout from "@/app/layout/UserLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}

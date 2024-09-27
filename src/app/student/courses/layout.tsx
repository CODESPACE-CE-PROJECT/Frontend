import StudentLayout from "@/app/student/StudentLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StudentLayout>{children}</StudentLayout>;
}
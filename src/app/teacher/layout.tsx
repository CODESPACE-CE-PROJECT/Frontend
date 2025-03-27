import { TeacherLayout } from "@/layout/TeacherLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <TeacherLayout>{children}</TeacherLayout>;
}

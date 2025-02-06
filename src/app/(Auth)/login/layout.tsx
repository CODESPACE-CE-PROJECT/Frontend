import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าเข้าสู่ระบบ",
  description: 'หน้าเข้าสู่ระบบ'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
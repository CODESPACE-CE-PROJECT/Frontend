import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าลืมรหัสผ่าน",
  description: 'หน้าลืมรหัสผ่าน'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
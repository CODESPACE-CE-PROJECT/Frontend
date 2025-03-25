import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าเปลี่ยนรหัสผ่าน",
  description: "หน้าเปลี่่ยนรหัสผ่าน",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <>{children}</>;
}
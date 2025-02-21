import ClassRoomNav from "@/components/Navbar/ClassRoomNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คอร์สเรียน",
  description: "คอร์สเรียน",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <ClassRoomNav /> */}
      <div className="flex flex-col p-10 w-screen h-screen">{children}</div>
    </>
  );
}

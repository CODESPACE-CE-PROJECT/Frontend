import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าโรงเรียน",
  description: "หน้าโรงเรียน",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col p-10 w-screen h-screen">{children}</div>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "พื้นที่เขียนโค้ด",
  description: "พื้นที่เขียนโค้ด",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

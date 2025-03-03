import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าปฏิทิน",
  description: "หน้าปฏิทิน",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

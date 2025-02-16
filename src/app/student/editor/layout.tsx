import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WokingSpace",
  description: "WokingSpace",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

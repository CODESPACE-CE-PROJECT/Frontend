import { Metadata } from "next";

export const metadata: Metadata = {
  title: "คอร์สเรียน",
  description: 'คอร์สเรียน'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>;
}
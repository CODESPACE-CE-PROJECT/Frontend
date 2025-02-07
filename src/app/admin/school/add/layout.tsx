import { Metadata } from "next";

export const metadata: Metadata = {
     title: "หน้าเพื่มโรงเรียน",
     description: 'หน้าเพื่มโรงเรียน'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>;
}
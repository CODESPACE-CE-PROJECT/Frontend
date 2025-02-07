import { Metadata } from "next";

export const metadata: Metadata = {
     title: "หน้าโรงเรียน",
     description: 'หน้าโรงเรียน'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <div className="flex flex-col px-14 py-10">
          {children}
     </div>;
}
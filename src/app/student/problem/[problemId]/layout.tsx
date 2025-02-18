import { Metadata } from "next";

export const metadata: Metadata = {
     title: "หน้าโจทย์การบ้าน",
     description: 'หน้าโจทย์การบ้าน'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>;
}
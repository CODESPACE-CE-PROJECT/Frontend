import { Metadata } from "next";


export const metadata: Metadata = {
     title: "หน้าโปรไฟล์",
     description: 'หน้าโปรไฟล์'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>;
}
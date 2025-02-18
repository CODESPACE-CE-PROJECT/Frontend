import { Metadata } from "next";
import { TopNav } from "@/components/Navbar/TopNav";
import { getProfile } from "@/actions/user";
import { IProfile } from "@/types/user";

export const metadata: Metadata = {
     title: "หน้าโปรไฟล์",
     description: 'หน้าโปรไฟล์'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     const { pictureUrl, role, gender }: IProfile = await getProfile()

     return <div className="flex flex-col px-14 py-10 gap-y-12">
          <TopNav disableNotification={true} imageUrl={pictureUrl} role={role} gender={gender}>
               <p>โปรไฟล์</p>
          </TopNav>
          {children}
     </div>;
}
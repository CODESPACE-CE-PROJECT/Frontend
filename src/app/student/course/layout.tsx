import { Metadata } from "next";
import { getProfile } from "@/actions/user";
import { TopNav } from "@/components/Navbar/TopNav";
import { IProfile } from "@/types/user";

export const metadata: Metadata = {
  title: "คอร์สเรียน",
  description: 'คอร์สเรียน'
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     const {pictureUrl}:IProfile = await getProfile()
     return <>
          <TopNav imageUrl={pictureUrl}><p>คอร์สเรียน</p></TopNav>
          {children}
     </>;
}
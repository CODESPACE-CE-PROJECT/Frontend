import Image from "next/image"
import platformLogo from "@/assets/Login/logo.svg"

export default function NotFoundPage() {
     return <div className="flex flex-col justify-center items-center text-2xl w-full h-screen gap-y-6">
          <Image 
               src={platformLogo}
               alt="logo"
               width={200}
               height={200}
          />
          <p>ไม่เจอหน้านี้</p>
          <p className="text-4xl font-bold">404 NOT FOUND</p>
     </div>
}
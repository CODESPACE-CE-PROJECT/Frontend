import { ReactNode } from "react";
import { TeacherLayout } from "@/app/layout/TeacherLayout";
import { Metadata } from "next/types";


interface Props {
     children: ReactNode
}

export const metadata: Metadata = {
  title: "คอร์สเรียน",
  description: 'คอร์สเรียน'
}

export default function Layout({ children }: Props) {
     return <>
          <TeacherLayout>
               {children}
          </TeacherLayout>
     </>
}
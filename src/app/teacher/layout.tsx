import { ReactNode } from "react";
import { TeacherLayout } from "@/layout/TeacherLayout";

interface Props {
     children: ReactNode
}

export default function Layout({ children }: Props) {
     return <>
          <TeacherLayout>
               {children}
          </TeacherLayout>
     </>
}
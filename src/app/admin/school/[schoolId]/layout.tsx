import { Metadata } from "next";
import { getSchoolById } from "@/actions/school";
import { ISchool } from "@/types/school";
type Props = {
     params: Promise<{ schoolId: string }>
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
     { params }: Props,
): Promise<Metadata> {
     const schoolId = (await params).schoolId
     const school:ISchool = await getSchoolById(schoolId)
     return {
          title: school.schoolName,
          description: school.schoolName
     }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
     return <>
          {children}
     </>
}
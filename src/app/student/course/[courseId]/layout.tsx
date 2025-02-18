import { getCoursesById } from "@/actions/course";
import ClassRoomNav from "@/components/Navbar/ClassRoomNav";
import { ICourse } from "@/types/course";
import { Metadata } from "next";

type Props = {
  params: Promise<{ courseId: string }>
}

export async function generateMetadata(
     { params }: Props,
): Promise<Metadata> {
     const courseId = (await params).courseId
     const data = await getCoursesById(courseId)
     const course: ICourse = data
     return {
          title: course?.title,
          description: course?.description
     }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClassRoomNav />
      <div className="flex flex-col p-10 w-screen h-screen">{children}</div>
    </>
  );
}

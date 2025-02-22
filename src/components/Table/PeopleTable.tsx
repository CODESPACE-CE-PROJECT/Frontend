import CourseUser from "@/components/Courses/CourseUser";
import { IProfile } from "@/types/user";

interface Props {
  teachers: { courseTeacherId: string; user: IProfile }[] | undefined;
  students: { courseStudentId: string; user: IProfile }[] | undefined;
}

export const PeopleTable: React.FC<Props> = ({ teachers, students }) => {
  return (
    <>
      <div className="flex justify-between items-center rounded-lg">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-2/3 text-center mr-4">
          ชื่อผู้เรียน
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-48 text-center mr-4">
          ประเภท
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#1E2A38] w-48 text-center">
          สถานะ
        </div>
      </div>
      {teachers?.map(({ user }) => (
        <CourseUser data={user} key={user.username} />
      ))}

      {students?.map(({ user }) => (
        <CourseUser data={user} key={user.username} />
      ))}
    </>
  );
};

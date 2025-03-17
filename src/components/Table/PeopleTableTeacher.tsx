import { IProfile } from "@/types/user";
import CourseUserTeacher from "../Courses/CourseUserTeacher";

interface Props {
  teachers: { courseTeacherId: string; user: IProfile }[] | undefined;
  students: { courseStudentId: string; user: IProfile }[] | undefined;
}

export const PeopleTableTeacher: React.FC<Props> = ({ teachers, students }) => {
  return (
    <>
      <div className="flex justify-between items-center rounded-lg gap-x-4">
        <div className="text-white text-lg py-3 rounded-md bg-[#1E2A38] w-[65%] text-center">
          รายชื่อ
        </div>
        <div className="text-white text-lg py-3 rounded-md bg-[#1E2A38] w-[15%] text-center">
          ประเภท
        </div>
        <div className="text-white text-lg py-3 rounded-md bg-[#1E2A38] w-[15%] text-center">
          สถานะ
        </div>
        <div className="text-white text-lg py-3 rounded-md text-center w-[5%]"></div>
      </div>

      {teachers?.map(({ user }) => (
        <CourseUserTeacher data={user} key={user.username} />
      ))}

      {students?.map(({ user }) => (
        <CourseUserTeacher data={user} key={user.username} />
      ))}
    </>
  );
};

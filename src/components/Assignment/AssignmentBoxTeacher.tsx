import { useRouter } from "next/navigation";
import { IAssignment } from "@/types/assignment";

interface Props {
  assignment: IAssignment["assignment"][number];
}

const AssignmentBoxTeacher: React.FC<Props> = ({ assignment }) => {
  const router = useRouter();

  return (
    <div
      className={`flex w-[30%] text-center gap-1 ${
        assignment.problem.length >= 6
          ? "justify-stretch flex-wrap"
          : "justify-start"
      }`}
    >
      {assignment.problem.map((problem, index) => (
        <div
          key={problem.problemId}
          className={`flex flex-col items-center justify-center rounded-sm cursor-pointer h-[3.75rem] w-[3.75rem] flex-grow-0 basis-[3.75rem]
            bg-[#808080] hover:bg-[#bebebe]
            ${assignment.problem.length >= 6 ? "grow" : ""}`}
          onClick={() => router.push(`/teacher/problem/${problem.problemId}`)}
        >
          <p className="space-x-1">
            <span>ข้อ</span>
            <span>{index + 1}</span>
          </p>
          <p>
            <span>{problem.score || 0}</span>
            <span>{"/"}</span>
            <span>{problem.score}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AssignmentBoxTeacher;

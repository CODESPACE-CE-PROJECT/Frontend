import { useRouter } from "next/navigation";
import { IProblem } from "@/types/assignment";

interface Props {
  data: IProblem[];
}

const AssignmentBoxTeacher: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className={`flex text-center gap-x-2 ${data.length >= 6
          ? "justify-stretch flex-wrap"
          : "justify-start"
        }`}
    >
      {data.map((problem, index) => (
        <div
          key={problem.problemId}
          className={`flex flex-col items-center cursor-pointer w-16 h-16 justify-center rounded-sm cursor-pointe flex-grow-0 
            bg-[#808080] hover:bg-[#bebebe]
            ${data.length >= 6 ? "grow" : ""}`}
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

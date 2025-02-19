import { useRouter } from "next/navigation";
import { IAssignment } from "@/types/assignment";
import { StateSubmission } from "@/enum/enum";

interface Props {
  assignment: IAssignment["assignment"][number]; // ใช้ assignment object ภายใน array
}

const AssignmentBox: React.FC<Props> = ({ assignment}) => {
  const router = useRouter();

  
  const getBackgroundColor = (state: string) => {
    switch (state) {
      case "PASS":
        return "bg-[#00DACC]"; 
      case "FAILED":
        return "bg-[#EF4343]"; 
      case "NOTSEND":
      default:
        return "bg-[#808080]"; 
    }
  };

  return (
    <div
      className={`flex w-4/12 text-center ${
        assignment.problem.length >= 6
          ? "justify-stretch space-x-1 md:space-x-4"
          : "justify-start space-x-4"
      }`}
    >
      {assignment.problem.map((problem, index) => (
        <div
          key={problem.problemId}
          className={`flex flex-col items-center justify-center rounded-sm h-[3.75rem] w-[3.75rem] flex-grow-0 basis-[3.75rem]
            ${
              assignment.isLock
                ? `${getBackgroundColor(problem.stateSubmission)}  hover:bg-[#bebebe] `
                : "border-2 border-dotted border-[#2A3A50] hover:border-[#2A3A50] hover:border-dotted"
            }
            ${assignment.problem.length >= 6 ? "flex-grow" : ""}`}
          onClick={
            assignment.isLock
              ? () => router.push(`/student/problem/${problem.problemId}`)
              : undefined
          }
        >
          <p className="space-x-1">
            <span>ข้อ</span>
            <span>{index + 1}</span>
          </p>
          <p>
            <span>
              {problem.stateSubmission === StateSubmission.NOTSEND ? 0 : problem.score || 0}
            </span>
            <span>{"/"}</span>
            <span>{problem.score}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AssignmentBox;

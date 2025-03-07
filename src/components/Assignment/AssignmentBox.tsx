import { useRouter } from "next/navigation";
import { IProblem } from "@/types/assignment";
import { StateSubmission } from "@/enum/enum";

interface Props {
  data: IProblem[];
  isLock: boolean
}

const AssignmentBox: React.FC<Props> = ({ data, isLock }) => {
  const router = useRouter();

  const getBackgroundColor = (stateSubmission: StateSubmission | undefined) => {
    switch (stateSubmission) {
      case StateSubmission.PASS:
        return "bg-[#00DACC] hover:bg-green-400";
      case StateSubmission.FAILED:
        return "bg-[#EF4343] hover:bg-red-300";
      case StateSubmission.NOTSEND:
      default:
        return "bg-[#808080] hover:bg-[#bebebe]";
    }
  };

  return (
    <div
      className={`flex text-center ${
        data.length >= 6
          ? "justify-stretch space-x-1 md:space-x-4"
          : "justify-start space-x-4"
      }`}
    >
      {data.map((item, index) => (
        <div
          key={item.problemId}
          className={`flex flex-col items-center justify-center rounded-sm w-16 h-16 flex-grow-0
            ${
              !isLock
                ? `${getBackgroundColor(
                    item.stateSubmission
                  )} cursor-pointer `
                : "border-2 border-dotted border-[#2A3A50] hover:border-[#2A3A50] hover:border-dotted "
            }
            ${data.length >= 6 ? "flex-grow" : ""}`}
          onClick={
            !isLock
              ? () => router.push(`/student/problem/${item.problemId}`)
              : undefined
          }
        >
          <p className="space-x-1">
            <span>ข้อ</span>
            <span>{index + 1}</span>
          </p>
          <p>
            <span>
              {item.stateSubmission === StateSubmission.NOTSEND
                ? 0
                : item.score || 0}
            </span>
            <span>{"/"}</span>
            <span>{item.score}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AssignmentBox;

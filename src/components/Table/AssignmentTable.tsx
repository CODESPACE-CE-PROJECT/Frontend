import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";

interface Props {
  assignments: IAssignment;
}

const AssignmentList: React.FC<Props> = ({ assignments }) => {
  return (
    <>
      {/* Table Header */}
      <div className="flex justify-center items-center rounded-lg pt-3 space-x-4">
        <div className="flex-1 text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-6/12">
          แบบฝึกหัด
        </div>
        <p className="flex text-white text-lg py-3 rounded-md bg-[#161f2e] justify-center items-center w-4/12">
          ข้อย่อย
        </p>
        <div className="flex text-white text-lg py-3 rounded-md bg-[#161f2e] justify-center items-center w-2/12">
          คะแนน
        </div>
      </div>

      {/* Assignment List */}
      {assignments.assignment?.map((assignment) => (
        <div
          key={assignment.assignmentId}
          className="flex justify-between items-center rounded-lg space-x-4"
        >
          {/* Assignment Title */}
          <div className="flex-1 text-white text-lg px-4 py-3 rounded-md text-start w-6/12 my-5">
            {assignment.title}
          </div>

          {/* Conditional Rendering: Show AssignmentBox or AssignmentBoxExam */}

          <AssignmentBox assignment={assignment} />

          {/* Total Score */}
          <div className="flex text-white text-lg px-4 py-3 justify-center text-center w-2/12">
            {assignment.totalScore}
          </div>
        </div>
      ))}
    </>
  );
};

export default AssignmentList;

import { IAssignment } from "@/types/assignment";
import AssignmentBox from "@/components/Assignment/AssignmentBox";
import AssignmentBoxExam from "@/components/Assignment/AssignmentBoxexam";

interface Props {
  assignments: IAssignment;
  courseId: string;
  isStudentOnSite: boolean; // รับค่าตัวแปรนี้เข้ามาจาก Props
}

const AssignmentList: React.FC<Props> = ({ assignments, courseId, isStudentOnSite }) => {
  return (
    <div>
      {/* Table Header */}
      <div className="flex justify-center items-center px-2 rounded-lg pt-3 gap-x-4">
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center w-1/2">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] flex-1 text-center w-4/12">
          ข้อย่อย
        </div>
        <div className="text-white text-lg px-4 py-3 rounded-md bg-[#161f2e] text-center w-1/6">
          คะแนน
        </div>
      </div>

      {/* Assignment List */}
      {assignments.assignment.map((assignment) => (
        <div key={assignment.assignmentId} className="flex justify-center items-center px-8 py-3 rounded-lg gap-x-4">
          {/* Assignment Title */}
          <div className="text-white text-lg px-3 rounded-md flex text-start flex-1 w-1/2 ml-3">
            {assignment.title}
          </div>

          {/* Conditional Rendering: Show AssignmentBox or AssignmentBoxExam */}
         
            <AssignmentBox assignment={assignment} courseId={courseId} />
         

          {/* Total Score */}
          <div className="text-white text-lg pl-9 rounded-md text-center w-1/6">
            {assignment.totalScore}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;

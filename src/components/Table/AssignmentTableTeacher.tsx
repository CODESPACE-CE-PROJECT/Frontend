import { IAssignment, IUpdateLock } from "@/types/assignment";
import ToggleButton from "@/components/Button/ToggleButton";
import { OptionAssignment } from "@/components/Options/OptionAssignment";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentBoxTeacher from "../Assignment/AssignmentBoxTeacher";

interface Props {
  assignments: IAssignment;
  courseId: string;
  onToggle: (assignmentData: IUpdateLock) => void;
}

const AssignmentTableTeacher: React.FC<Props> = ({
  assignments,
  courseId,
  onToggle,
}) => {
  return (
    <>
      {/* Table Header */}
      <div className="flex justify-center items-center rounded-lg pt-3 gap-x-4">
        <div className="text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-[40%]">
          แบบฝึกหัด
        </div>
        <div className="text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-[12.5%]">
          สถานะ
        </div>
        <div className="text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-[30%]">
          ข้อย่อย
        </div>
        <div className="text-white text-lg py-3 rounded-md bg-[#161f2e] text-center w-[12.5%]">
          คะแนน
        </div>
        <div className="text-white text-lg py-3 rounded-md text-center w-[5%]"></div>
      </div>

      {assignments.assignment?.map((assignment) => {
        const [isChecked, setIsChecked] = useState(assignment.isLock);

        const handleToggle = (newState: boolean) => {
          setIsChecked(newState);
          onToggle({ assignmentId: assignment.assignmentId, isLock: newState });
        };

        return (
          <div
            key={assignment.assignmentId}
            className="flex justify-center items-center rounded-lg py-3 gap-x-4"
          >
            <div className="flex text-white text-lg rounded-md items-center space-x-3 w-[40%]">
              <div
                className={`rounded-full p-2 ms-5 ${
                  assignment.isLock
                    ? "bg-[#EF4343] text-white"
                    : "bg-white text-black"
                }`}
              >
                <CampaignIcon fontSize="inherit" className="text-2xl" />
              </div>
              <span>{assignment.title}</span>
            </div>

            {/* ToggleButton */}
            <div className="flex text-white text-lg rounded-md items-center justify-center w-[12.5%]">
              <ToggleButton initialState={isChecked} onToggle={handleToggle} />
              <span className="ms-3 text-sm font-medium text-white">
                {isChecked ? "เปิด" : "ปิด"}
              </span>
            </div>

            <AssignmentBoxTeacher assignment={assignment} courseId={courseId} />

            <div className="text-white text-lg rounded-md text-center w-[12.5%]">
              {assignment.totalScore}
            </div>

            <div className="text-white text-lg rounded-md text-center w-[5%]">
              <OptionAssignment assignmentId={assignment.assignmentId} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AssignmentTableTeacher;

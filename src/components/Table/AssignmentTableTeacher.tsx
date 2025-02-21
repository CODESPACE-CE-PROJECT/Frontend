import { useState } from "react";
import { IAssignment, IUpdateLock } from "@/types/assignment";
import ToggleButton from "@/components/Button/ToggleButton";
import { OptionAssignment } from "@/components/Options/OptionAssignment";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentBoxTeacher from "../Assignment/AssignmentBoxTeacher";

interface Props {
  assignments: IAssignment;
  onToggle: (assignmentData: IUpdateLock) => void;
}

const AssignmentTableTeacher: React.FC<Props> = ({ assignments, onToggle }) => {
  const [lockStates, setLockStates] = useState(
    assignments.assignment.map((assignment) => assignment.isLock)
  );

  const handleToggle = (index: number, newState: boolean) => {
    const updatedLockStates = [...lockStates];
    updatedLockStates[index] = newState;
    setLockStates(updatedLockStates);
    onToggle({
      assignmentId: assignments.assignment[index].assignmentId,
      isLock: newState,
    });
  };
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

        const handleToggle = (newState: boolean) => {
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
                  !assignment.isLock
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
              <ToggleButton initialState={assignment.isLock} onToggle={handleToggle} />
              <span className="ms-3 text-sm font-medium text-white">
                {assignment.isLock ? "เปิด" : "ปิด"}

              </span>
            </div>

            <AssignmentBoxTeacher assignment={assignment} />

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
